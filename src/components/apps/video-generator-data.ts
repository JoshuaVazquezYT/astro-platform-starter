export interface Voice {
    id: string;
    name: string;
    gender: 'male' | 'female' | 'neutral';
    age: 'young' | 'adult' | 'mature';
    accent: string;
    description: string;
    category: 'sfw' | 'nsfw';
}

export interface Style {
    id: string;
    name: string;
    description: string;
    category: 'sfw' | 'nsfw';
    genre: string;
}

export const voices: Voice[] = [
    // SFW Voices (50)
    { id: 'sfw-001', name: 'Emma Professional', gender: 'female', age: 'adult', accent: 'American', description: 'Professional business voice', category: 'sfw' },
    { id: 'sfw-002', name: 'David Corporate', gender: 'male', age: 'adult', accent: 'British', description: 'Corporate presenter voice', category: 'sfw' },
    { id: 'sfw-003', name: 'Sarah Narrator', gender: 'female', age: 'mature', accent: 'Canadian', description: 'Documentary narrator', category: 'sfw' },
    { id: 'sfw-004', name: 'Michael News', gender: 'male', age: 'mature', accent: 'American', description: 'News anchor voice', category: 'sfw' },
    { id: 'sfw-005', name: 'Lisa Teacher', gender: 'female', age: 'adult', accent: 'Australian', description: 'Educational instructor', category: 'sfw' },
    { id: 'sfw-006', name: 'James Tutorial', gender: 'male', age: 'young', accent: 'American', description: 'Tutorial guide voice', category: 'sfw' },
    { id: 'sfw-007', name: 'Grace Storyteller', gender: 'female', age: 'adult', accent: 'Irish', description: 'Storytelling voice', category: 'sfw' },
    { id: 'sfw-008', name: 'Robert Calm', gender: 'male', age: 'mature', accent: 'British', description: 'Calm meditation voice', category: 'sfw' },
    { id: 'sfw-009', name: 'Nina Friendly', gender: 'female', age: 'young', accent: 'American', description: 'Friendly conversational', category: 'sfw' },
    { id: 'sfw-010', name: 'Thomas Wise', gender: 'male', age: 'mature', accent: 'Scottish', description: 'Wise professor voice', category: 'sfw' },
    { id: 'sfw-011', name: 'Olivia Cheerful', gender: 'female', age: 'young', accent: 'American', description: 'Cheerful and upbeat', category: 'sfw' },
    { id: 'sfw-012', name: 'William Classic', gender: 'male', age: 'mature', accent: 'British', description: 'Classic BBC voice', category: 'sfw' },
    { id: 'sfw-013', name: 'Sophie Gentle', gender: 'female', age: 'adult', accent: 'French-English', description: 'Gentle and soothing', category: 'sfw' },
    { id: 'sfw-014', name: 'Alexander Bold', gender: 'male', age: 'adult', accent: 'American', description: 'Bold and confident', category: 'sfw' },
    { id: 'sfw-015', name: 'Charlotte Elegant', gender: 'female', age: 'adult', accent: 'British', description: 'Elegant and refined', category: 'sfw' },
    { id: 'sfw-016', name: 'Daniel Tech', gender: 'male', age: 'young', accent: 'American', description: 'Tech enthusiast voice', category: 'sfw' },
    { id: 'sfw-017', name: 'Isabella Warm', gender: 'female', age: 'adult', accent: 'Spanish-English', description: 'Warm and welcoming', category: 'sfw' },
    { id: 'sfw-018', name: 'Benjamin Serious', gender: 'male', age: 'mature', accent: 'American', description: 'Serious documentary tone', category: 'sfw' },
    { id: 'sfw-019', name: 'Ava Youthful', gender: 'female', age: 'young', accent: 'Canadian', description: 'Youthful and energetic', category: 'sfw' },
    { id: 'sfw-020', name: 'Henry Distinguished', gender: 'male', age: 'mature', accent: 'British', description: 'Distinguished gentleman', category: 'sfw' },
    { id: 'sfw-021', name: 'Mia Expressive', gender: 'female', age: 'adult', accent: 'Australian', description: 'Expressive storyteller', category: 'sfw' },
    { id: 'sfw-022', name: 'Lucas Casual', gender: 'male', age: 'young', accent: 'American', description: 'Casual and relaxed', category: 'sfw' },
    { id: 'sfw-023', name: 'Zoe Articulate', gender: 'female', age: 'adult', accent: 'British', description: 'Clear and articulate', category: 'sfw' },
    { id: 'sfw-024', name: 'Noah Motivational', gender: 'male', age: 'adult', accent: 'American', description: 'Motivational speaker', category: 'sfw' },
    { id: 'sfw-025', name: 'Lily Delicate', gender: 'female', age: 'young', accent: 'Irish', description: 'Delicate and soft', category: 'sfw' },
    { id: 'sfw-026', name: 'Samuel Authoritative', gender: 'male', age: 'mature', accent: 'American', description: 'Authoritative presence', category: 'sfw' },
    { id: 'sfw-027', name: 'Ella Bright', gender: 'female', age: 'young', accent: 'American', description: 'Bright and optimistic', category: 'sfw' },
    { id: 'sfw-028', name: 'Jack Adventurous', gender: 'male', age: 'adult', accent: 'Australian', description: 'Adventurous explorer', category: 'sfw' },
    { id: 'sfw-029', name: 'Chloe Sophisticated', gender: 'female', age: 'adult', accent: 'British', description: 'Sophisticated and cultured', category: 'sfw' },
    { id: 'sfw-030', name: 'Owen Thoughtful', gender: 'male', age: 'mature', accent: 'Canadian', description: 'Thoughtful philosopher', category: 'sfw' },
    { id: 'sfw-031', name: 'Hannah Informative', gender: 'female', age: 'adult', accent: 'American', description: 'Informative presenter', category: 'sfw' },
    { id: 'sfw-032', name: 'Ethan Dynamic', gender: 'male', age: 'young', accent: 'American', description: 'Dynamic and engaging', category: 'sfw' },
    { id: 'sfw-033', name: 'Amelia Graceful', gender: 'female', age: 'adult', accent: 'British', description: 'Graceful and poised', category: 'sfw' },
    { id: 'sfw-034', name: 'Mason Reliable', gender: 'male', age: 'adult', accent: 'American', description: 'Reliable and trustworthy', category: 'sfw' },
    { id: 'sfw-035', name: 'Harper Creative', gender: 'female', age: 'young', accent: 'American', description: 'Creative and imaginative', category: 'sfw' },
    { id: 'sfw-036', name: 'Logan Steady', gender: 'male', age: 'mature', accent: 'American', description: 'Steady and consistent', category: 'sfw' },
    { id: 'sfw-037', name: 'Evelyn Melodic', gender: 'female', age: 'adult', accent: 'Welsh', description: 'Melodic and musical', category: 'sfw' },
    { id: 'sfw-038', name: 'Jackson Bold', gender: 'male', age: 'young', accent: 'American', description: 'Bold and confident', category: 'sfw' },
    { id: 'sfw-039', name: 'Abigail Intelligent', gender: 'female', age: 'adult', accent: 'American', description: 'Intelligent and analytical', category: 'sfw' },
    { id: 'sfw-040', name: 'Sebastian Refined', gender: 'male', age: 'mature', accent: 'British', description: 'Refined and cultured', category: 'sfw' },
    { id: 'sfw-041', name: 'Emily Compassionate', gender: 'female', age: 'adult', accent: 'Canadian', description: 'Compassionate and caring', category: 'sfw' },
    { id: 'sfw-042', name: 'Aiden Energetic', gender: 'male', age: 'young', accent: 'Irish', description: 'Energetic and lively', category: 'sfw' },
    { id: 'sfw-043', name: 'Madison Polished', gender: 'female', age: 'adult', accent: 'American', description: 'Polished professional', category: 'sfw' },
    { id: 'sfw-044', name: 'Connor Genuine', gender: 'male', age: 'adult', accent: 'Scottish', description: 'Genuine and authentic', category: 'sfw' },
    { id: 'sfw-045', name: 'Scarlett Vibrant', gender: 'female', age: 'young', accent: 'American', description: 'Vibrant and lively', category: 'sfw' },
    { id: 'sfw-046', name: 'Liam Measured', gender: 'male', age: 'mature', accent: 'British', description: 'Measured and deliberate', category: 'sfw' },
    { id: 'sfw-047', name: 'Aria Harmonious', gender: 'female', age: 'adult', accent: 'American', description: 'Harmonious and balanced', category: 'sfw' },
    { id: 'sfw-048', name: 'Gabriel Inspiring', gender: 'male', age: 'adult', accent: 'American', description: 'Inspiring and uplifting', category: 'sfw' },
    { id: 'sfw-049', name: 'Luna Dreamy', gender: 'female', age: 'young', accent: 'American', description: 'Dreamy and whimsical', category: 'sfw' },
    { id: 'sfw-050', name: 'Theodore Scholarly', gender: 'male', age: 'mature', accent: 'British', description: 'Scholarly and erudite', category: 'sfw' },

    // NSFW Voices (50)
    { id: 'nsfw-001', name: 'Scarlett Seductive', gender: 'female', age: 'adult', accent: 'American', description: 'Seductive and sultry', category: 'nsfw' },
    { id: 'nsfw-002', name: 'Dominic Commanding', gender: 'male', age: 'adult', accent: 'British', description: 'Commanding and dominant', category: 'nsfw' },
    { id: 'nsfw-003', name: 'Vixen Playful', gender: 'female', age: 'young', accent: 'American', description: 'Playful and teasing', category: 'nsfw' },
    { id: 'nsfw-004', name: 'Rex Intense', gender: 'male', age: 'mature', accent: 'American', description: 'Intense and passionate', category: 'nsfw' },
    { id: 'nsfw-005', name: 'Raven Mysterious', gender: 'female', age: 'adult', accent: 'British', description: 'Mysterious and alluring', category: 'nsfw' },
    { id: 'nsfw-006', name: 'Hunter Rough', gender: 'male', age: 'adult', accent: 'American', description: 'Rough and assertive', category: 'nsfw' },
    { id: 'nsfw-007', name: 'Desire Breathless', gender: 'female', age: 'young', accent: 'French-English', description: 'Breathless and wanting', category: 'nsfw' },
    { id: 'nsfw-008', name: 'Blade Dangerous', gender: 'male', age: 'adult', accent: 'American', description: 'Dangerous and edgy', category: 'nsfw' },
    { id: 'nsfw-009', name: 'Velvet Smooth', gender: 'female', age: 'adult', accent: 'American', description: 'Smooth and sensual', category: 'nsfw' },
    { id: 'nsfw-010', name: 'Stone Firm', gender: 'male', age: 'mature', accent: 'British', description: 'Firm and unyielding', category: 'nsfw' },
    { id: 'nsfw-011', name: 'Candy Sweet', gender: 'female', age: 'young', accent: 'American', description: 'Sweet with edge', category: 'nsfw' },
    { id: 'nsfw-012', name: 'Titan Powerful', gender: 'male', age: 'adult', accent: 'American', description: 'Powerful and imposing', category: 'nsfw' },
    { id: 'nsfw-013', name: 'Silk Luxurious', gender: 'female', age: 'adult', accent: 'British', description: 'Luxurious and smooth', category: 'nsfw' },
    { id: 'nsfw-014', name: 'Storm Turbulent', gender: 'male', age: 'adult', accent: 'American', description: 'Turbulent and wild', category: 'nsfw' },
    { id: 'nsfw-015', name: 'Cherry Tempting', gender: 'female', age: 'young', accent: 'American', description: 'Tempting and sweet', category: 'nsfw' },
    { id: 'nsfw-016', name: 'Ace Confident', gender: 'male', age: 'adult', accent: 'American', description: 'Confident and smooth', category: 'nsfw' },
    { id: 'nsfw-017', name: 'Jade Exotic', gender: 'female', age: 'adult', accent: 'British', description: 'Exotic and enticing', category: 'nsfw' },
    { id: 'nsfw-018', name: 'Phoenix Rising', gender: 'male', age: 'mature', accent: 'American', description: 'Rising passion', category: 'nsfw' },
    { id: 'nsfw-019', name: 'Honey Dripping', gender: 'female', age: 'young', accent: 'American', description: 'Sweet and dripping', category: 'nsfw' },
    { id: 'nsfw-020', name: 'Wolf Primal', gender: 'male', age: 'adult', accent: 'American', description: 'Primal and wild', category: 'nsfw' },
    { id: 'nsfw-021', name: 'Rose Blooming', gender: 'female', age: 'adult', accent: 'American', description: 'Blooming desire', category: 'nsfw' },
    { id: 'nsfw-022', name: 'Diesel Rough', gender: 'male', age: 'adult', accent: 'American', description: 'Rough and mechanical', category: 'nsfw' },
    { id: 'nsfw-023', name: 'Lace Delicate', gender: 'female', age: 'young', accent: 'French-English', description: 'Delicate but daring', category: 'nsfw' },
    { id: 'nsfw-024', name: 'Thunder Booming', gender: 'male', age: 'mature', accent: 'American', description: 'Booming and powerful', category: 'nsfw' },
    { id: 'nsfw-025', name: 'Passion Burning', gender: 'female', age: 'adult', accent: 'Spanish-English', description: 'Burning passion', category: 'nsfw' },
    { id: 'nsfw-026', name: 'Steel Hardened', gender: 'male', age: 'adult', accent: 'American', description: 'Hardened and strong', category: 'nsfw' },
    { id: 'nsfw-027', name: 'Velour Soft', gender: 'female', age: 'adult', accent: 'American', description: 'Soft yet provocative', category: 'nsfw' },
    { id: 'nsfw-028', name: 'Rogue Rebellious', gender: 'male', age: 'young', accent: 'British', description: 'Rebellious and wild', category: 'nsfw' },
    { id: 'nsfw-029', name: 'Satin Glossy', gender: 'female', age: 'adult', accent: 'American', description: 'Glossy and smooth', category: 'nsfw' },
    { id: 'nsfw-030', name: 'Venom Dangerous', gender: 'male', age: 'adult', accent: 'American', description: 'Dangerously seductive', category: 'nsfw' },
    { id: 'nsfw-031', name: 'Amber Glowing', gender: 'female', age: 'young', accent: 'American', description: 'Glowing warmth', category: 'nsfw' },
    { id: 'nsfw-032', name: 'Razor Sharp', gender: 'male', age: 'adult', accent: 'American', description: 'Sharp and cutting', category: 'nsfw' },
    { id: 'nsfw-033', name: 'Crimson Deep', gender: 'female', age: 'adult', accent: 'British', description: 'Deep and rich', category: 'nsfw' },
    { id: 'nsfw-034', name: 'Savage Wild', gender: 'male', age: 'adult', accent: 'American', description: 'Wild and untamed', category: 'nsfw' },
    { id: 'nsfw-035', name: 'Flame Flickering', gender: 'female', age: 'young', accent: 'American', description: 'Flickering desire', category: 'nsfw' },
    { id: 'nsfw-036', name: 'Onyx Dark', gender: 'male', age: 'mature', accent: 'British', description: 'Dark and mysterious', category: 'nsfw' },
    { id: 'nsfw-037', name: 'Spice Arousing', gender: 'female', age: 'adult', accent: 'American', description: 'Arousing and exotic', category: 'nsfw' },
    { id: 'nsfw-038', name: 'Viper Striking', gender: 'male', age: 'adult', accent: 'American', description: 'Quick and striking', category: 'nsfw' },
    { id: 'nsfw-039', name: 'Mist Ethereal', gender: 'female', age: 'adult', accent: 'Irish', description: 'Ethereal and mysterious', category: 'nsfw' },
    { id: 'nsfw-040', name: 'Frost Cold', gender: 'male', age: 'adult', accent: 'American', description: 'Cold and calculating', category: 'nsfw' },
    { id: 'nsfw-041', name: 'Ember Smoldering', gender: 'female', age: 'young', accent: 'American', description: 'Smoldering heat', category: 'nsfw' },
    { id: 'nsfw-042', name: 'Granite Solid', gender: 'male', age: 'mature', accent: 'American', description: 'Solid and immovable', category: 'nsfw' },
    { id: 'nsfw-043', name: 'Blaze Fiery', gender: 'female', age: 'adult', accent: 'American', description: 'Fiery and intense', category: 'nsfw' },
    { id: 'nsfw-044', name: 'Obsidian Sharp', gender: 'male', age: 'adult', accent: 'British', description: 'Sharp and volcanic', category: 'nsfw' },
    { id: 'nsfw-045', name: 'Nectar Sweet', gender: 'female', age: 'young', accent: 'American', description: 'Sweet and intoxicating', category: 'nsfw' },
    { id: 'nsfw-046', name: 'Titan Colossal', gender: 'male', age: 'mature', accent: 'American', description: 'Colossal presence', category: 'nsfw' },
    { id: 'nsfw-047', name: 'Opal Shimmering', gender: 'female', age: 'adult', accent: 'Australian', description: 'Shimmering beauty', category: 'nsfw' },
    { id: 'nsfw-048', name: 'Tempest Stormy', gender: 'male', age: 'adult', accent: 'American', description: 'Stormy and powerful', category: 'nsfw' },
    { id: 'nsfw-049', name: 'Cinnamon Spicy', gender: 'female', age: 'adult', accent: 'American', description: 'Spicy and warm', category: 'nsfw' },
    { id: 'nsfw-050', name: 'Maverick Untamed', gender: 'male', age: 'adult', accent: 'American', description: 'Untamed and free', category: 'nsfw' }
];

export const styles: Style[] = [
    // SFW Styles (50)
    { id: 'sfw-style-001', name: 'Anime Classic', description: 'Traditional anime art style', category: 'sfw', genre: 'Animation' },
    { id: 'sfw-style-002', name: 'Realistic Portrait', description: 'Photorealistic human portraits', category: 'sfw', genre: 'Realistic' },
    { id: 'sfw-style-003', name: 'Cartoon Disney', description: 'Disney-style cartoon animation', category: 'sfw', genre: 'Animation' },
    { id: 'sfw-style-004', name: '3D Pixar', description: 'Pixar-style 3D animation', category: 'sfw', genre: '3D' },
    { id: 'sfw-style-005', name: 'Watercolor Art', description: 'Soft watercolor painting style', category: 'sfw', genre: 'Artistic' },
    { id: 'sfw-style-006', name: 'Oil Painting', description: 'Classic oil painting technique', category: 'sfw', genre: 'Artistic' },
    { id: 'sfw-style-007', name: 'Sketch Drawing', description: 'Hand-drawn pencil sketch', category: 'sfw', genre: 'Artistic' },
    { id: 'sfw-style-008', name: 'Cyberpunk Neon', description: 'Futuristic cyberpunk aesthetic', category: 'sfw', genre: 'Sci-Fi' },
    { id: 'sfw-style-009', name: 'Steampunk Victorian', description: 'Victorian steampunk machinery', category: 'sfw', genre: 'Steampunk' },
    { id: 'sfw-style-010', name: 'Fantasy Medieval', description: 'Medieval fantasy world', category: 'sfw', genre: 'Fantasy' },
    { id: 'sfw-style-011', name: 'Nature Documentary', description: 'BBC nature documentary style', category: 'sfw', genre: 'Documentary' },
    { id: 'sfw-style-012', name: 'Corporate Professional', description: 'Clean corporate presentation', category: 'sfw', genre: 'Business' },
    { id: 'sfw-style-013', name: 'Educational Explainer', description: 'Educational video style', category: 'sfw', genre: 'Educational' },
    { id: 'sfw-style-014', name: 'Vintage Retro', description: '1950s vintage aesthetic', category: 'sfw', genre: 'Vintage' },
    { id: 'sfw-style-015', name: 'Minimalist Modern', description: 'Clean minimalist design', category: 'sfw', genre: 'Modern' },
    { id: 'sfw-style-016', name: 'Comic Book Hero', description: 'Superhero comic book style', category: 'sfw', genre: 'Comic' },
    { id: 'sfw-style-017', name: 'Manga Style', description: 'Japanese manga illustration', category: 'sfw', genre: 'Animation' },
    { id: 'sfw-style-018', name: 'Pastel Kawaii', description: 'Cute pastel kawaii style', category: 'sfw', genre: 'Cute' },
    { id: 'sfw-style-019', name: 'Studio Ghibli', description: 'Studio Ghibli animation style', category: 'sfw', genre: 'Animation' },
    { id: 'sfw-style-020', name: 'Art Deco Elegant', description: 'Elegant Art Deco design', category: 'sfw', genre: 'Vintage' },
    { id: 'sfw-style-021', name: 'Pixel Art Retro', description: '8-bit pixel art style', category: 'sfw', genre: 'Retro' },
    { id: 'sfw-style-022', name: 'Impressionist Monet', description: 'Impressionist painting style', category: 'sfw', genre: 'Artistic' },
    { id: 'sfw-style-023', name: 'Geometric Abstract', description: 'Abstract geometric shapes', category: 'sfw', genre: 'Abstract' },
    { id: 'sfw-style-024', name: 'Cinematic Film', description: 'Hollywood movie cinematography', category: 'sfw', genre: 'Cinematic' },
    { id: 'sfw-style-025', name: 'Surreal Dali', description: 'Surrealist art style', category: 'sfw', genre: 'Surreal' },
    { id: 'sfw-style-026', name: 'Pop Art Warhol', description: 'Pop art vibrant colors', category: 'sfw', genre: 'Pop Art' },
    { id: 'sfw-style-027', name: 'Noir Detective', description: 'Film noir black and white', category: 'sfw', genre: 'Noir' },
    { id: 'sfw-style-028', name: 'Space Sci-Fi', description: 'Futuristic space exploration', category: 'sfw', genre: 'Sci-Fi' },
    { id: 'sfw-style-029', name: 'Victorian Gothic', description: 'Gothic Victorian architecture', category: 'sfw', genre: 'Gothic' },
    { id: 'sfw-style-030', name: 'Tropical Paradise', description: 'Tropical vacation vibes', category: 'sfw', genre: 'Nature' },
    { id: 'sfw-style-031', name: 'Urban Street Art', description: 'Street art and graffiti', category: 'sfw', genre: 'Urban' },
    { id: 'sfw-style-032', name: 'Classical Renaissance', description: 'Renaissance art style', category: 'sfw', genre: 'Classical' },
    { id: 'sfw-style-033', name: 'Chibi Cute', description: 'Chibi anime style', category: 'sfw', genre: 'Cute' },
    { id: 'sfw-style-034', name: 'Architectural Modern', description: 'Modern architecture focus', category: 'sfw', genre: 'Architecture' },
    { id: 'sfw-style-035', name: 'Fashion Editorial', description: 'High fashion photography', category: 'sfw', genre: 'Fashion' },
    { id: 'sfw-style-036', name: 'Adventure Travel', description: 'Adventure travel documentary', category: 'sfw', genre: 'Adventure' },
    { id: 'sfw-style-037', name: 'Cooking Show', description: 'Professional cooking presentation', category: 'sfw', genre: 'Cooking' },
    { id: 'sfw-style-038', name: 'Tech Innovation', description: 'Modern technology showcase', category: 'sfw', genre: 'Technology' },
    { id: 'sfw-style-039', name: 'Sports Dynamic', description: 'Dynamic sports action', category: 'sfw', genre: 'Sports' },
    { id: 'sfw-style-040', name: 'Music Concert', description: 'Live music performance', category: 'sfw', genre: 'Music' },
    { id: 'sfw-style-041', name: 'Children Story', description: 'Children\'s book illustration', category: 'sfw', genre: 'Children' },
    { id: 'sfw-style-042', name: 'Science Laboratory', description: 'Scientific research setting', category: 'sfw', genre: 'Science' },
    { id: 'sfw-style-043', name: 'Historical Drama', description: 'Historical period drama', category: 'sfw', genre: 'Historical' },
    { id: 'sfw-style-044', name: 'Wellness Spa', description: 'Relaxing wellness environment', category: 'sfw', genre: 'Wellness' },
    { id: 'sfw-style-045', name: 'Craft Tutorial', description: 'DIY craft instruction', category: 'sfw', genre: 'Tutorial' },
    { id: 'sfw-style-046', name: 'Garden Nature', description: 'Beautiful garden landscapes', category: 'sfw', genre: 'Nature' },
    { id: 'sfw-style-047', name: 'Automotive Show', description: 'Car showcase presentation', category: 'sfw', genre: 'Automotive' },
    { id: 'sfw-style-048', name: 'Cultural Festival', description: 'Cultural celebration events', category: 'sfw', genre: 'Cultural' },
    { id: 'sfw-style-049', name: 'Meditation Zen', description: 'Peaceful meditation setting', category: 'sfw', genre: 'Spiritual' },
    { id: 'sfw-style-050', name: 'Academic Lecture', description: 'University lecture hall', category: 'sfw', genre: 'Academic' },

    // NSFW Styles (50)
    { id: 'nsfw-style-001', name: 'Sultry Boudoir', description: 'Intimate boudoir photography', category: 'nsfw', genre: 'Intimate' },
    { id: 'nsfw-style-002', name: 'Seductive Anime', description: 'Seductive anime art style', category: 'nsfw', genre: 'Animation' },
    { id: 'nsfw-style-003', name: 'Passionate Romance', description: 'Romantic intimate scenes', category: 'nsfw', genre: 'Romance' },
    { id: 'nsfw-style-004', name: 'Noir Temptation', description: 'Film noir seduction', category: 'nsfw', genre: 'Noir' },
    { id: 'nsfw-style-005', name: 'Artistic Nude', description: 'Artistic nude photography', category: 'nsfw', genre: 'Artistic' },
    { id: 'nsfw-style-006', name: 'Sensual 3D', description: 'Sensual 3D animation', category: 'nsfw', genre: '3D' },
    { id: 'nsfw-style-007', name: 'Erotic Manga', description: 'Adult manga illustration', category: 'nsfw', genre: 'Animation' },
    { id: 'nsfw-style-008', name: 'Steamy Realistic', description: 'Realistic intimate scenes', category: 'nsfw', genre: 'Realistic' },
    { id: 'nsfw-style-009', name: 'Fetish Fashion', description: 'Fetish fashion photography', category: 'nsfw', genre: 'Fashion' },
    { id: 'nsfw-style-010', name: 'Vintage Pin-up', description: 'Vintage pin-up girl style', category: 'nsfw', genre: 'Vintage' },
    { id: 'nsfw-style-011', name: 'Gothic Seduction', description: 'Gothic seductive imagery', category: 'nsfw', genre: 'Gothic' },
    { id: 'nsfw-style-012', name: 'Cyberpunk Erotic', description: 'Futuristic erotic cyberpunk', category: 'nsfw', genre: 'Sci-Fi' },
    { id: 'nsfw-style-013', name: 'Fantasy Desire', description: 'Fantasy world adult content', category: 'nsfw', genre: 'Fantasy' },
    { id: 'nsfw-style-014', name: 'Hentai Classic', description: 'Traditional hentai style', category: 'nsfw', genre: 'Animation' },
    { id: 'nsfw-style-015', name: 'Sensual Oil Paint', description: 'Sensual oil painting', category: 'nsfw', genre: 'Artistic' },
    { id: 'nsfw-style-016', name: 'Dominance Power', description: 'Power dynamics imagery', category: 'nsfw', genre: 'Power' },
    { id: 'nsfw-style-017', name: 'Submission Soft', description: 'Soft submission themes', category: 'nsfw', genre: 'Soft' },
    { id: 'nsfw-style-018', name: 'Latex Shine', description: 'Shiny latex materials', category: 'nsfw', genre: 'Fetish' },
    { id: 'nsfw-style-019', name: 'Silk Elegance', description: 'Elegant silk and satin', category: 'nsfw', genre: 'Elegant' },
    { id: 'nsfw-style-020', name: 'Tantra Sacred', description: 'Sacred tantra imagery', category: 'nsfw', genre: 'Spiritual' },
    { id: 'nsfw-style-021', name: 'Burlesque Show', description: 'Burlesque performance', category: 'nsfw', genre: 'Performance' },
    { id: 'nsfw-style-022', name: 'Lingerie Boutique', description: 'Luxury lingerie showcase', category: 'nsfw', genre: 'Fashion' },
    { id: 'nsfw-style-023', name: 'Passion Fire', description: 'Fiery passionate scenes', category: 'nsfw', genre: 'Passionate' },
    { id: 'nsfw-style-024', name: 'Forbidden Desire', description: 'Forbidden desire themes', category: 'nsfw', genre: 'Taboo' },
    { id: 'nsfw-style-025', name: 'Velvet Lounge', description: 'Luxurious velvet settings', category: 'nsfw', genre: 'Luxury' },
    { id: 'nsfw-style-026', name: 'Midnight Temptation', description: 'Late night temptation', category: 'nsfw', genre: 'Dark' },
    { id: 'nsfw-style-027', name: 'Erotic Renaissance', description: 'Renaissance erotic art', category: 'nsfw', genre: 'Classical' },
    { id: 'nsfw-style-028', name: 'Neon Strip Club', description: 'Neon-lit adult venues', category: 'nsfw', genre: 'Urban' },
    { id: 'nsfw-style-029', name: 'Bedroom Intimate', description: 'Intimate bedroom scenes', category: 'nsfw', genre: 'Intimate' },
    { id: 'nsfw-style-030', name: 'Shower Steam', description: 'Steamy shower scenes', category: 'nsfw', genre: 'Steamy' },
    { id: 'nsfw-style-031', name: 'Massage Sensual', description: 'Sensual massage therapy', category: 'nsfw', genre: 'Sensual' },
    { id: 'nsfw-style-032', name: 'Adult Comic', description: 'Adult comic book style', category: 'nsfw', genre: 'Comic' },
    { id: 'nsfw-style-033', name: 'Kama Sutra', description: 'Kama Sutra positions', category: 'nsfw', genre: 'Educational' },
    { id: 'nsfw-style-034', name: 'Pole Dance', description: 'Pole dancing performance', category: 'nsfw', genre: 'Performance' },
    { id: 'nsfw-style-035', name: 'Bondage Artistic', description: 'Artistic bondage imagery', category: 'nsfw', genre: 'Artistic' },
    { id: 'nsfw-style-036', name: 'Leather Luxury', description: 'Luxury leather fashion', category: 'nsfw', genre: 'Fashion' },
    { id: 'nsfw-style-037', name: 'Champagne Luxury', description: 'Luxury champagne settings', category: 'nsfw', genre: 'Luxury' },
    { id: 'nsfw-style-038', name: 'Rose Petal', description: 'Romantic rose petal scenes', category: 'nsfw', genre: 'Romantic' },
    { id: 'nsfw-style-039', name: 'Candle Light', description: 'Candlelit intimate settings', category: 'nsfw', genre: 'Romantic' },
    { id: 'nsfw-style-040', name: 'Mirror Reflection', description: 'Mirror play and reflection', category: 'nsfw', genre: 'Playful' },
    { id: 'nsfw-style-041', name: 'Fur Texture', description: 'Luxurious fur textures', category: 'nsfw', genre: 'Texture' },
    { id: 'nsfw-style-042', name: 'Oil Massage', description: 'Sensual oil massage', category: 'nsfw', genre: 'Sensual' },
    { id: 'nsfw-style-043', name: 'Champagne Bath', description: 'Luxury champagne bath', category: 'nsfw', genre: 'Luxury' },
    { id: 'nsfw-style-044', name: 'Seductive Dance', description: 'Seductive dance performance', category: 'nsfw', genre: 'Performance' },
    { id: 'nsfw-style-045', name: 'Aphrodite Divine', description: 'Divine goddess imagery', category: 'nsfw', genre: 'Mythological' },
    { id: 'nsfw-style-046', name: 'Tantric Energy', description: 'Tantric energy flow', category: 'nsfw', genre: 'Spiritual' },
    { id: 'nsfw-style-047', name: 'Pleasure Garden', description: 'Hedonistic pleasure gardens', category: 'nsfw', genre: 'Fantasy' },
    { id: 'nsfw-style-048', name: 'Silk Road', description: 'Exotic silk road themes', category: 'nsfw', genre: 'Exotic' },
    { id: 'nsfw-style-049', name: 'Velvet Underground', description: 'Underground velvet scenes', category: 'nsfw', genre: 'Underground' },
    { id: 'nsfw-style-050', name: 'Erotic Surreal', description: 'Surreal erotic imagery', category: 'nsfw', genre: 'Surreal' }
];

export const getVoicesByCategory = (category: 'sfw' | 'nsfw') => {
    return voices.filter(voice => voice.category === category);
};

export const getStylesByCategory = (category: 'sfw' | 'nsfw') => {
    return styles.filter(style => style.category === category);
};

export const getVoiceById = (id: string) => {
    const result = voices.filter(voice => voice.id === id);
    return result.length > 0 ? result[0] : undefined;
};

export const getStyleById = (id: string) => {
    const result = styles.filter(style => style.id === id);
    return result.length > 0 ? result[0] : undefined;
};