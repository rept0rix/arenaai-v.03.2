import { createClientFromRequest } from 'npm:@base44/sdk@0.5.0';

// ======================================================================================
// !! ACTION REQUIRED !!
// Please provide the base URL for your images.
// For example: 'https://cdn.your-domain.com/images/'
const IMAGE_BASE_URL = 'https://arena-ai.moshe.xyz/api/File/GetFile?id='; // Placeholder - replace if incorrect
// ======================================================================================

const transformPropertyData = (item, imagesByAlbum) => {
  if (!item || !item.asset || !item.project) return null;
  
  const { asset, project, company } = item;
  
  const propertyTypeMapping = {
    1: 'דירה', 2: 'פנטהאוז', 3: 'דופלקס', 4: 'סטודיו',
  };

  const getGallery = (albumId) => {
    const albumImages = imagesByAlbum[albumId] || [];
    if (albumImages.length === 0) return [];
    // Assuming image filenames are unique or IDs are provided to construct URLs
    // Let's assume the title is the filename for now.
    return albumImages.map(img => `${IMAGE_BASE_URL}${img.id}`);
  };

  const gallery = getGallery(asset.albumId);
  const imageUrl = gallery.length > 0 ? gallery[0] : `https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80`;

  const features = project.tags.map(tag => tag.name);
  if (asset.hasGarbageChute) features.push('משפך אשפה');
  if (asset.hasSolarWaterHeater) features.push('דוד שמש');
  if (asset.isBrightApartment) features.push('דירה מוארת');
  if (asset.storageSizeSqm > 0) features.push('מחסן');
  
  return {
    id: asset.id.toString(),
    title: `דירת ${asset.numRooms} חדרים ב${project.nameHe}`,
    description: asset.technicalSpecificationsText || `נכס בפרויקט ${project.nameHe}.`,
    price: asset.price,
    location: project.address,
    address: project.address,
    city: project.address?.split(',')[1]?.trim() || project.nameHe.split(' ')[0] || 'לא צוין',
    property_type: propertyTypeMapping[asset.assetTypeId] || 'דירה',
    rooms: asset.numRooms,
    size: asset.sizeSqm,
    floor: asset.floorNumber,
    parking: asset.parkingSpots > 0,
    parking_spots: asset.parkingSpots,
    elevator: project.tags?.some(tag => tag.name === 'מעלית'),
    balcony: asset.balconySizeSqm > 0,
    balcony_size: asset.balconySizeSqm,
    storage: asset.storageSizeSqm > 0,
    storage_size: asset.storageSizeSqm,
    condition: 'חדש',
    air_directions: asset.airDirections,
    year_built: new Date(project.createdAt).getFullYear(),
    image_url: imageUrl,
    gallery_images: gallery,
    features: features,
    latitude: project.locationY,
    longitude: project.locationX,
    developer: company.nameHe,
    project_name: project.nameHe,
    payment_terms: asset.paymentTerms,
    financing_available: true,
    immediate_occupancy: false,
    budget_min: asset.minimumDownPayment,
    budget_max: asset.price,
  };
};

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  // SECURITY FIX: Check if user is authenticated AND has admin role
  try {
    const currentUser = await base44.auth.me();
    if (!currentUser || currentUser.role !== 'admin') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Unauthorized - Admin access required' 
      }), { 
        status: 403, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Authentication required' 
    }), { 
      status: 401, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  try {
    console.log('Starting properties import...');
    const response = await fetch('https://arena-ai.moshe.xyz/api/Search/SearchAssets', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(120000) // Increased timeout to 2 minutes
    });

    if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
    
    const apiData = await response.json();
    if (!apiData.items || !Array.isArray(apiData.items) || !apiData.imagesByAlbum) {
      throw new Error('Invalid API response format. Missing items or imagesByAlbum.');
    }
    console.log(`Received ${apiData.items.length} properties and ${Object.keys(apiData.imagesByAlbum).length} image albums from API.`);

    const transformedProperties = apiData.items
      .map(item => transformPropertyData(item, apiData.imagesByAlbum))
      .filter(p => p !== null);
      
    console.log(`Successfully transformed ${transformedProperties.length} properties.`);

    // Delete existing properties - NOW WITH PROPER ADMIN CHECK
    try {
      const existingProperties = await base44.asServiceRole.entities.Property.filter({});
      const existingIds = existingProperties.map(p => p.id);
      if (existingIds.length > 0) {
          for (const id of existingIds) {
              await base44.asServiceRole.entities.Property.delete(id);
          }
          console.log(`Deleted ${existingIds.length} existing properties.`);
      }
    } catch (deleteError) {
      console.warn('Could not delete existing properties, continuing with import.', deleteError.message);
    }

    // Bulk create new properties - NOW WITH PROPER ADMIN CHECK
    const batchSize = 100;
    let importedCount = 0;
    let errors = [];

    for (let i = 0; i < transformedProperties.length; i += batchSize) {
      const batch = transformedProperties.slice(i, i + batchSize);
      try {
        await base44.asServiceRole.entities.Property.bulkCreate(batch);
        importedCount += batch.length;
        console.log(`Imported batch ${Math.floor(i/batchSize) + 1}: ${importedCount}/${transformedProperties.length} properties`);
      } catch (batchError) {
        console.error(`Error importing batch ${Math.floor(i/batchSize) + 1}:`, batchError);
        errors.push(`Batch ${i / batchSize + 1}: ${batchError.message}`);
      }
    }

    console.log(`Import completed: ${importedCount} properties imported.`);
    return new Response(JSON.stringify({
      success: true,
      message: `Successfully imported ${importedCount} out of ${transformedProperties.length} properties.`,
      imported: importedCount,
      total: transformedProperties.length,
      errors: errors.length > 0 ? errors : null
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Import error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: error.message, 
      stack: error.stack 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
});