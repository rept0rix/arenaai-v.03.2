import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId } = await req.json();

    if (!projectId) {
      return Response.json({ error: 'Project ID is required' }, { status: 400 });
    }

    // Get all interactions for this project
    const interactions = await base44.asServiceRole.entities.ProjectInteraction.filter({ 
      projectId 
    });

    // Get all leads for this project
    const leads = await base44.asServiceRole.entities.Lead.filter({ 
      project_id: projectId 
    });

    // Get all meetings for this project
    const meetings = await base44.asServiceRole.entities.Meeting.filter({ 
      project_id: projectId 
    });

    // Calculate unique views (unique user IDs)
    const uniqueViews = new Set(interactions.map(i => i.userId)).size;

    // Count interaction types
    const viewInteractions = interactions.filter(i => i.interactionType === 'view').length;
    const inquiryInteractions = interactions.filter(i => i.interactionType === 'inquiry').length;

    // Leads breakdown
    const leadsGenerated = leads.length;
    const hotLeads = leads.filter(l => l.maturity_level === 'ready').length;
    const leadsInMeeting = leads.filter(l => l.status === 'in_meeting' || l.status === 'ready_for_meeting').length;
    const closedWon = leads.filter(l => l.status === 'closed_won').length;

    // Meetings breakdown
    const scheduledMeetings = meetings.filter(m => m.status === 'scheduled').length;
    const completedMeetings = meetings.filter(m => m.status === 'completed').length;

    // Calculate funnel
    const funnel = {
      viewed: uniqueViews,
      interested: inquiryInteractions,
      left_details: leadsGenerated,
      meeting: scheduledMeetings + completedMeetings
    };

    // Calculate conversion rates
    const conversionRates = {
      view_to_interest: uniqueViews > 0 ? (inquiryInteractions / uniqueViews * 100).toFixed(1) : 0,
      interest_to_lead: inquiryInteractions > 0 ? (leadsGenerated / inquiryInteractions * 100).toFixed(1) : 0,
      lead_to_meeting: leadsGenerated > 0 ? ((scheduledMeetings + completedMeetings) / leadsGenerated * 100).toFixed(1) : 0
    };

    return Response.json({
      success: true,
      analytics: {
        unique_views: uniqueViews,
        interactions: {
          total: interactions.length,
          views: viewInteractions,
          inquiries: inquiryInteractions
        },
        leads: {
          total: leadsGenerated,
          hot: hotLeads,
          in_meeting: leadsInMeeting,
          closed_won: closedWon
        },
        meetings: {
          scheduled: scheduledMeetings,
          completed: completedMeetings,
          total: meetings.length
        },
        funnel,
        conversion_rates: conversionRates
      }
    });

  } catch (error) {
    console.error('Error aggregating analytics:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});