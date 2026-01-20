import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get all scheduled meetings
    const meetings = await base44.asServiceRole.entities.Meeting.filter({ 
      status: 'scheduled' 
    });

    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const dayAfterTomorrow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    let remindersSent = 0;

    for (const meeting of meetings) {
      const meetingDate = new Date(meeting.date_time);

      // Check if meeting is tomorrow and reminder not sent yet
      if (meetingDate >= tomorrow && 
          meetingDate < dayAfterTomorrow && 
          !meeting.reminder_sent) {
        
        try {
          // Send reminder to developer
          await base44.asServiceRole.functions.invoke('sendMeetingNotifications', {
            meetingId: meeting.id,
            notificationType: 'reminder_developer'
          });

          // Send reminder to buyer
          await base44.asServiceRole.functions.invoke('sendMeetingNotifications', {
            meetingId: meeting.id,
            notificationType: 'reminder_buyer'
          });

          remindersSent++;
        } catch (error) {
          console.error(`Error sending reminder for meeting ${meeting.id}:`, error);
        }
      }
    }

    return Response.json({ 
      success: true, 
      remindersSent 
    });

  } catch (error) {
    console.error('Error sending meeting reminders:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});