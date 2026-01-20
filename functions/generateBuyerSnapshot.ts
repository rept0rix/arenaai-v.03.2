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

    // Get chat session if exists
    let chatContext = '';
    if (lead.chat_session_id) {
      const chatSessions = await base44.asServiceRole.entities.ChatSession.filter({ 
        id: lead.chat_session_id 
      });
      if (chatSessions.length > 0) {
        const session = chatSessions[0];
        chatContext = JSON.stringify(session.answers || {}, null, 2);
      }
    }

    // Get anonymous session if exists
    let sessionContext = '';
    if (lead.session_id) {
      const sessions = await base44.asServiceRole.entities.AnonymousSession.filter({ 
        session_id: lead.session_id 
      });
      if (sessions.length > 0) {
        const session = sessions[0];
        sessionContext = JSON.stringify({
          purpose: session.purpose,
          profile_vector: session.profile_vector,
          conversation_context: session.conversation_context
        }, null, 2);
      }
    }

    // Get interest trigger
    let triggerContext = '';
    if (lead.session_id) {
      const triggers = await base44.asServiceRole.entities.InterestTrigger.filter({ 
        session_id: lead.session_id 
      });
      if (triggers.length > 0) {
        triggerContext = JSON.stringify(triggers[0], null, 2);
      }
    }

    // Generate buyer snapshot using AI
    const prompt = `
אתה מנתח נתונים של לקוחות פוטנציאליים בתחום הנדל"ן.
קיבלת את הנתונים הבאים על קונה פוטנציאלי:

פרטי הליד:
- שם: ${lead.full_name}
- מקור: ${lead.source}

${chatContext ? `תשובות מצ'אט:\n${chatContext}\n` : ''}
${sessionContext ? `הקשר סשן:\n${sessionContext}\n` : ''}
${triggerContext ? `טריגר עניין:\n${triggerContext}\n` : ''}

בהתבסס על הנתונים, צור פרופיל קונה מפורט.

חשוב: החזר JSON תקין בלבד, ללא טקסט נוסף.
`;

    const response = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description: "סוג הרוכש: 'זוג צעיר', 'משקיע', 'משפר דיור', 'קונה ראשון', 'משקיע מנוסה'"
          },
          motivations: {
            type: "array",
            items: { type: "string" },
            description: "מניעים מרכזיים: מגורים, השקעה, יציבות, תשואה, וכו'"
          },
          maturity: {
            type: "string",
            description: "רמת בשלות: 'סקרנות', 'השוואה', 'מוכן לפגישה'"
          },
          top_3_preferences: {
            type: "array",
            items: { type: "string" },
            description: "3 דברים הכי חשובים לקונה: מיקום, תקציב, טיפוס דירה, קומה, אור, חניה וכו'"
          },
          project_explainability: {
            type: "string",
            description: "הסבר קצר (2-3 משפטים) למה הפרויקט/נכס שהתעניין בו מתאים לו"
          },
          budget_range: {
            type: "string",
            description: "טווח תקציב משוער אם יש מידע"
          },
          key_concerns: {
            type: "string",
            description: "חששות או שאלות מרכזיות"
          }
        },
        required: ["type", "motivations", "maturity", "top_3_preferences", "project_explainability"]
      }
    });

    // Update lead with buyer profile
    await base44.asServiceRole.entities.Lead.update(leadId, {
      buyer_profile_summary: response,
      maturity_level: response.maturity === 'מוכן לפגישה' ? 'ready' : 
                      response.maturity === 'השוואה' ? 'comparison' : 'curiosity'
    });

    return Response.json({ 
      success: true, 
      buyer_profile: response 
    });

  } catch (error) {
    console.error('Error generating buyer snapshot:', error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});