import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    const { propertyId, projectId, developerId } = await req.json();

    if (!propertyId && !projectId) {
      return Response.json({ error: 'Property ID or Project ID required' }, { status: 400 });
    }

    // Track the inquiry interaction
    await base44.asServiceRole.entities.ProjectInteraction.create({
      projectId: projectId,
      developerId: developerId,
      userId: user.id,
      userEmail: user.email,
      userFullName: user.full_name,
      interactionType: 'inquiry'
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Error tracking inquiry:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});