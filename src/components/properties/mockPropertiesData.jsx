// Mock data for properties with enhanced project information
export const mockProperties = [
  // Project 1: "בוגם רטוביר" - Tel Aviv Luxury Project
  {
    id: "p1_a_5",
    projectId: "proj_001",
    project_name: "בוגם רטוביר",
    title: "דירת 5 חדרים בבוגם רטוביר",
    description: "דירת יוקרה עם נוף לים ומרפסת שמש גדולה",
    price: 4500000,
    location: "תל אביב",
    address: "רחוב דיזנגוף 100, תל אביב",
    city: "תל אביב",
    property_type: "דירה",
    rooms: 5,
    size: 140,
    floor: 8,
    total_floors: 12,
    parking: true,
    parking_spots: 2,
    elevator: true,
    balcony: true,
    balcony_size: 25,
    storage: true,
    storage_size: 8,
    condition: "חדש מקבלן",
    air_directions: "מערב, דרום",
    year_built: 2024,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["מעלית", "חניה", "מחסן", "מרפסת שמש", "נוף לים"],
    unit_type: "A",
    status: "available",
    facing: "ים + דרום",
    other_properties_in_project_count: 47,
    developer: "בוגם נדל״ן",
    project_total_units: 48,
    model_3d_url: "https://example.com/models/bogem-type-a.jpg"
  },
  {
    id: "p1_b_4",
    projectId: "proj_001",
    project_name: "בוגם רטוביר",
    title: "דירת 4 חדרים בבוגם רטוביר",
    description: "דירת גן מרווחת עם חצר פרטית",
    price: 3800000,
    location: "תל אביב",
    address: "רחוב דיזנגוף 100, תל אביב",
    city: "תל אביב",
    property_type: "דירת גן",
    rooms: 4,
    size: 120,
    floor: 0,
    total_floors: 12,
    parking: true,
    parking_spots: 2,
    elevator: true,
    balcony: true,
    balcony_size: 50,
    storage: true,
    storage_size: 10,
    condition: "חדש מקבלן",
    air_directions: "צפון, מזרח",
    year_built: 2024,
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["מעלית", "חניה", "מחסן", "חצר פרטית", "דירת גן"],
    unit_type: "B",
    status: "available",
    facing: "עורף + צפון",
    other_properties_in_project_count: 47,
    developer: "בוגם נדל״ן",
    project_total_units: 48,
    model_3d_url: "https://example.com/models/bogem-type-b.jpg"
  },
  {
    id: "p1_c_3",
    projectId: "proj_001",
    project_name: "בוגם רטוביר",
    title: "דירת 3 חדרים בבוגם רטוביר",
    description: "דירה קומפקטית ומעוצבת",
    price: 2900000,
    location: "תל אביב",
    address: "רחוב דיזנגוף 100, תל אביב",
    city: "תל אביב",
    property_type: "דירה",
    rooms: 3,
    size: 85,
    floor: 4,
    total_floors: 12,
    parking: true,
    parking_spots: 1,
    elevator: true,
    balcony: true,
    balcony_size: 12,
    storage: false,
    condition: "חדש מקבלן",
    air_directions: "דרום, מזרח",
    year_built: 2024,
    image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [],
    features: ["מעלית", "חניה", "מרפסת"],
    unit_type: "C",
    status: "sold",
    facing: "דרום + מזרח",
    other_properties_in_project_count: 47,
    developer: "בוגם נדל״ן",
    project_total_units: 48
  },

  // Project 2: "מגדל הים" - Netanya Sea Tower
  {
    id: "p2_a_6",
    projectId: "proj_002",
    project_name: "מגדל הים נתניה",
    title: "פנטהאוז 6 חדרים במגדל הים",
    description: "פנטהאוז יוקרתי עם נוף פנורמי לים",
    price: 6200000,
    location: "נתניה",
    address: "שדרות ניצה 45, נתניה",
    city: "נתניה",
    property_type: "פנטהאוז",
    rooms: 6,
    size: 200,
    floor: 20,
    total_floors: 20,
    parking: true,
    parking_spots: 3,
    elevator: true,
    balcony: true,
    balcony_size: 80,
    storage: true,
    storage_size: 15,
    condition: "חדש מקבלן",
    air_directions: "מערב, דרום, צפון",
    year_built: 2024,
    image_url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    features: ["מעלית", "חניה", "מחסן", "מרפסת ענקית", "נוף פנורמי", "פנטהאוז"],
    unit_type: "P",
    status: "available",
    facing: "ים 270 מעלות",
    other_properties_in_project_count: 39,
    developer: "אפריקה ישראל",
    project_total_units: 40,
    model_3d_url: "https://example.com/models/sea-tower-penthouse.jpg"
  },
  {
    id: "p2_b_4",
    projectId: "proj_002",
    project_name: "מגדל הים נתניה",
    title: "דירת 4 חדרים במגדל הים",
    description: "דירה מרווחת עם נוף לים",
    price: 3500000,
    location: "נתניה",
    address: "שדרות ניצה 45, נתניה",
    city: "נתניה",
    property_type: "דירה",
    rooms: 4,
    size: 110,
    floor: 12,
    total_floors: 20,
    parking: true,
    parking_spots: 1,
    elevator: true,
    balcony: true,
    balcony_size: 16,
    storage: true,
    storage_size: 6,
    condition: "חדש מקבלן",
    air_directions: "מערב, דרום",
    year_built: 2024,
    image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [],
    features: ["מעלית", "חניה", "מחסן", "נוף לים"],
    unit_type: "A",
    status: "reserved",
    facing: "ים + דרום",
    other_properties_in_project_count: 39,
    developer: "אפריקה ישראל",
    project_total_units: 40
  },

  // Project 3: "פארק הירוק" - Raanana Green Park
  {
    id: "p3_a_5",
    projectId: "proj_003",
    project_name: "פארק הירוק רעננה",
    title: "דירת 5 חדרים בפארק הירוק",
    description: "דירה מרווחת עם נוף לפארק",
    price: 3200000,
    location: "רעננה",
    address: "רחוב אחוזה 12, רעננה",
    city: "רעננה",
    property_type: "דירה",
    rooms: 5,
    size: 130,
    floor: 3,
    total_floors: 8,
    parking: true,
    parking_spots: 2,
    elevator: true,
    balcony: true,
    balcony_size: 20,
    storage: true,
    storage_size: 8,
    condition: "חדש מקבלן",
    air_directions: "צפון, מזרח",
    year_built: 2025,
    image_url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [],
    features: ["מעלית", "חניה", "מחסן", "נוף לפארק", "שכונה שקטה"],
    unit_type: "A",
    status: "available",
    facing: "פארק + צפון",
    other_properties_in_project_count: 23,
    developer: "שיכון ובינוי",
    project_total_units: 24,
    model_3d_url: "https://example.com/models/green-park-type-a.jpg"
  },

  // Project 4: "כיכר העיר" - Herzliya City Square
  {
    id: "p4_a_4",
    projectId: "proj_004",
    project_name: "כיכר העיר הרצליה",
    title: "דירת 4 חדרים בכיכר העיר",
    description: "דירה במיקום מרכזי עם כל השירותים",
    price: 4200000,
    location: "הרצליה",
    address: "רחוב סוקולוב 25, הרצליה",
    city: "הרצליה",
    property_type: "דירה",
    rooms: 4,
    size: 115,
    floor: 6,
    total_floors: 10,
    parking: true,
    parking_spots: 1,
    elevator: true,
    balcony: true,
    balcony_size: 15,
    storage: true,
    storage_size: 6,
    condition: "חדש מקבלן",
    air_directions: "דרום, מערב",
    year_built: 2024,
    image_url: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [],
    features: ["מעלית", "חניה", "מחסן", "מיקום מרכזי", "קרוב לתחבורה"],
    unit_type: "B",
    status: "available",
    facing: "דרום + מערב",
    other_properties_in_project_count: 31,
    developer: "יובלים נדל״ן",
    project_total_units: 32
  },

  // Single properties (not part of large projects)
  {
    id: "single_1",
    title: "בית פרטי בכפר סבא",
    description: "בית פרטי מרווח עם גינה וחצר",
    price: 5500000,
    location: "כפר סבא",
    address: "רחוב הרצל 50, כפר סבא",
    city: "כפר סבא",
    property_type: "בית פרטי",
    rooms: 6,
    size: 220,
    floor: 0,
    parking: true,
    parking_spots: 3,
    elevator: false,
    balcony: false,
    storage: true,
    storage_size: 20,
    condition: "משופץ",
    year_built: 2015,
    image_url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [],
    features: ["חניה", "גינה", "חצר פרטית"],
    status: "available",
    other_properties_in_project_count: 0
  },
  {
    id: "single_2",
    title: "דירת גן בגבעתיים",
    description: "דירת גן מקסימה עם חצר מטופחת",
    price: 4100000,
    location: "גבעתיים",
    address: "רחוב קטינקא 8, גבעתיים",
    city: "גבעתיים",
    property_type: "דירת גן",
    rooms: 4,
    size: 125,
    floor: 0,
    parking: true,
    parking_spots: 2,
    elevator: false,
    balcony: true,
    balcony_size: 40,
    storage: true,
    storage_size: 8,
    condition: "משופץ חלקית",
    year_built: 2018,
    image_url: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery_images: [],
    features: ["חניה", "מחסן", "חצר פרטית", "דירת גן"],
    status: "available",
    other_properties_in_project_count: 0
  }
];

// Helper function to get properties by project
export const getPropertiesByProject = (projectId) => {
  return mockProperties.filter(p => p.projectId === projectId);
};

// Helper function to get unique projects
export const getUniqueProjects = () => {
  const projects = {};
  mockProperties.forEach(prop => {
    if (prop.projectId && !projects[prop.projectId]) {
      projects[prop.projectId] = {
        id: prop.projectId,
        name: prop.project_name,
        developer: prop.developer,
        location: prop.city,
        totalUnits: prop.project_total_units,
        address: prop.address
      };
    }
  });
  return Object.values(projects);
};

// Helper function to get "best fit" properties from each project (for search results)
export const getBestFitPropertiesPerProject = (allProperties = mockProperties) => {
  const projectMap = new Map();
  
  allProperties.forEach(property => {
    if (property.projectId) {
      if (!projectMap.has(property.projectId)) {
        projectMap.set(property.projectId, []);
      }
      projectMap.get(property.projectId).push(property);
    }
  });
  
  const bestFitProperties = [];
  
  // For each project, select up to 2 "best fit" properties
  projectMap.forEach((properties, projectId) => {
    // Prioritize available properties
    const available = properties.filter(p => p.status === 'available');
    const sorted = available.length > 0 ? available : properties;
    
    // Take up to 2 properties from each project
    bestFitProperties.push(...sorted.slice(0, 2));
  });
  
  // Add single properties (not part of projects)
  allProperties.forEach(property => {
    if (!property.projectId) {
      bestFitProperties.push(property);
    }
  });
  
  return bestFitProperties;
};