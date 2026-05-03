import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { leadId } = await req.json();

    if (!leadId) {
      return Response.json({ error: 'Lead ID is required' }, { status: 400 });
    }

    // Get lead data
    const leads = await base44.asServiceRole.entities.Lead.filter({ id: leadId });
    if (!leads || leads.length === 0) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }
    const lead = leads[0];

    // Get chat session
    let conversationData = '';
    if (lead.chat_session_id) {
      const chatSessions = await base44.asServiceRole.entities.ChatSession.filter({ 
        id: lead.chat_session_id 
      });
      if (chatSessions.length > 0) {
        const session = chatSessions[0];
        conversationData = JSON.stringify({
          answers: session.answers,
          purpose: session.purpose,
          is_guided: session.is_guided
        }, null, 2);
      }
    }

    // Get anonymous session conversation
    if (lead.session_id) {
      const sessions = await base44.asServiceRole.entities.AnonymousSession.filter({ 
        session_id: lead.session_id 
      });
      if (sessions.length > 0) {
        const session = sessions[0];
        if (session.conversation_context) {
          conversationData += '\n' + JSON.stringify(session.conversation_context, null, 2);
        }
      }
    }

    if (!conversationData) {
      return Response.json({ 
        error: 'No conversation data found' 
      }, { status: 404 });
    }

    // Generate conversation summary using AI
    const prompt = `
אתה מסכם שיחות בין יועצת נדל"ן AI (ארנה) לבין קונים פוטנציאליים.

נתוני השיחה:
${conversationData}

צור סיכום תמציתי של השיחה בפורמט הבא:

חשוב: החזר JSON תקין בלבד, ללא טקסט נוסף.
כל שדה צריך להיות 1-2 משפטים בלבד, תמציתי ולעניין.
`;

    const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          what_searched: {
            type: "string",
            description: "מה הקונה חיפש - 1-2 משפטים"
          },
          what_liked: {
            type: "string",
            description: "מה אהב/התעניין - 1-2 משפטים"
          },
          what_blocked: {
            type: "string",
            description: "מה חסם או פחות התאים - 1-2 משפטים"
          },
          next_recommended_step: {
            type: "string",
            description: "הצעד המומלץ הבא - משפט אחד קצר"
          }
        },
        required: ["what_searched", "what_liked", "what_blocked", "next_recommended_step"]
      }
    });

    // Update lead with conversation summary
    await base44.asServiceRole.entities.Lead.update(leadId, {
      conversation_summary: response
    });

    return Response.json({ 
      success: true, 
      conversation_summary: response 
    });

  } catch (error) {
    console.error('Error generating conversation summary:', error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});