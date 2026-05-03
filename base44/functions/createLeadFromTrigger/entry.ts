import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    const { triggerId } = await req.json();

    if (!triggerId) {
      return Response.json({ error: 'Trigger ID is required' }, { status: 400 });
    }

    // Get the trigger
    const triggers = await base44.asServiceRole.entities.InterestTrigger.filter({ id: triggerId });
    if (!triggers || triggers.length === 0) {
      return Response.json({ error: 'Trigger not found' }, { status: 404 });
    }
    const trigger = triggers[0];

    // Check if lead already exists for this session/email
    const existingLeads = await base44.asServiceRole.entities.Lead.filter({ 
      email: trigger.email 
    });

    let leadId;

    if (existingLeads.length > 0) {
      // Update existing lead
      leadId = existingLeads[0].id;
      await base44.asServiceRole.entities.Lead.update(leadId, {
        session_id: trigger.session_id,
        updated_date: new Date().toISOString()
      });
    } else {
      // Create new lead
      const leadData = {
        full_name: trigger.full_name,
        email: trigger.email,
        phone: trigger.phone,
        session_id: trigger.session_id,
        property_id: trigger.property_id,
        source: trigger.trigger_type,
        status: 'new'
      };

      const newLead = await base44.asServiceRole.entities.Lead.create(leadData);
      leadId = newLead.id;
    }

    // Auto-generate buyer snapshot and conversation summary
    try {
      await base44.asServiceRole.functions.invoke('generateBuyerSnapshot', { leadId });
    } catch (err) {
      console.log('Could not generate buyer snapshot:', err.message);
    }

    try {
      await base44.asServiceRole.functions.invoke('generateConversationSummary', { leadId });
    } catch (err) {
      console.log('Could not generate conversation summary:', err.message);
    }

    return Response.json({ 
      success: true, 
      leadId 
    });

  } catch (error) {
    console.error('Error creating lead:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});