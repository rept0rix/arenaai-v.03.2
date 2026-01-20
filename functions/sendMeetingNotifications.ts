import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { meetingId, notificationType } = await req.json();

    if (!meetingId || !notificationType) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Get meeting details
    const meetings = await base44.asServiceRole.entities.Meeting.filter({ id: meetingId });
    if (!meetings || meetings.length === 0) {
      return Response.json({ error: 'Meeting not found' }, { status: 404 });
    }
    const meeting = meetings[0];

    // Get lead details
    const leads = await base44.asServiceRole.entities.Lead.filter({ id: meeting.lead_id });
    if (!leads || leads.length === 0) {
      return Response.json({ error: 'Lead not found' }, { status: 404 });
    }
    const lead = leads[0];

    // Get project details if exists
    let projectName = 'פרויקט';
    if (meeting.project_id) {
      const projects = await base44.asServiceRole.entities.Project.filter({ id: meeting.project_id });
      if (projects.length > 0) {
        projectName = projects[0].name_he;
      }
    }

    const meetingDate = new Date(meeting.date_time);
    const dateStr = meetingDate.toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = meetingDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

    if (notificationType === 'reminder_developer') {
      // Send reminder to developer/sales person
      const salesEmail = meeting.sales_person_id || 'sales@arena-ai.org';
      
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: salesEmail,
        subject: `תזכורת פגישה: ${lead.full_name} - ${projectName}`,
        body: `
שלום,

תזכורת לפגישה מחר:

לקוח: ${lead.full_name}
טלפון: ${lead.phone}
אימייל: ${lead.email}

תאריך: ${dateStr}
שעה: ${timeStr}
${meeting.location ? `מיקום: ${meeting.location}` : ''}

פרופיל הקונה:
${lead.buyer_profile_summary ? `
- סוג: ${lead.buyer_profile_summary.type || ''}
- בשלות: ${lead.buyer_profile_summary.maturity || ''}
- מה חשוב: ${lead.buyer_profile_summary.top_3_preferences?.join(', ') || ''}
` : 'טרם נוצר פרופיל'}

${lead.conversation_summary ? `
סיכום שיחה:
- חיפש: ${lead.conversation_summary.what_searched || ''}
- אהב: ${lead.conversation_summary.what_liked || ''}
- חסם: ${lead.conversation_summary.what_blocked || ''}
` : ''}

${meeting.notes ? `הערות: ${meeting.notes}` : ''}

בהצלחה!
Arena AI
        `
      });

      await base44.asServiceRole.entities.Meeting.update(meetingId, {
        reminder_sent: true
      });

    } else if (notificationType === 'reminder_buyer') {
      // Send reminder to buyer
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: lead.email,
        subject: `תזכורת לפגישה - ${projectName}`,
        body: `
שלום ${lead.full_name},

מזכירים לך על הפגישה שלנו:

תאריך: ${dateStr}
שעה: ${timeStr}
${meeting.location ? `מיקום: ${meeting.location}` : ''}

${meeting.meeting_type === 'phone' ? 'נתקשר אלייך בטלפון' : 'נשמח לראותך!'}

אם יש שינוי בתכניות, אנא עדכן אותנו.

בברכה,
צוות Arena AI
        `
      });

    } else if (notificationType === 'followup_developer') {
      // Send follow-up to developer
      const salesEmail = meeting.sales_person_id || 'sales@arena-ai.org';
      
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: salesEmail,
        subject: `בקשה לסיכום פגישה: ${lead.full_name}`,
        body: `
שלום,

הפגישה עם ${lead.full_name} התקיימה היום.

אנא עדכן:
1. איך עברה הפגישה?
2. מה התוצאה?
3. האם יש צורך בפעולות המשך?

לחץ כאן לעדכון הליד: [קישור לעמוד הליד]

תודה!
Arena AI
        `
      });

    } else if (notificationType === 'followup_buyer') {
      // Send follow-up to buyer
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: lead.email,
        subject: 'איך היתה הפגישה?',
        body: `
שלום ${lead.full_name},

תודה שהקדשת מזמנך להיפגש איתנו!

נשמח לשמוע:
- האם הפגישה עזרה לך?
- האם יש מידע נוסף שתרצה לקבל?
- האם תרצה להמשיך בתהליך?

אנחנו כאן בשבילך לכל שאלה.

בברכה,
צוות Arena AI
        `
      });

      await base44.asServiceRole.entities.Meeting.update(meetingId, {
        followup_sent: true
      });
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Error sending notifications:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});