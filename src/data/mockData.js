// Mock data for StyleSync Fashion Tech Web App

export const INITIAL_WARDROBE = [];

export const CREATORS = [
  {
    id: 'c1',
    name: 'Julian K.',
    handle: '@julian_style',
    height: 178, // in cm
    waist: 30, // in inches
    build: 'Athletic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    featuredLook: 'Minimalist Smart Casual',
    followers: '142K',
    matchingCategory: 'Smart Casual',
    outfitImage: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
    totalCost: '$104.90 SGD',
    outfit: {
      top: 'Black Oversized Crew Tee ($0 - Owned)',
      bottom: 'Uniqlo Smart Ankle Trousers ($39.90)',
      outer: 'Structured Linen Blazer ($65.00)',
      shoes: 'White Leather Sneakers ($0 - Owned)'
    }
  },
  {
    id: 'c2',
    name: 'Sophia Chen',
    handle: '@sophiastyles',
    height: 165,
    waist: 26,
    build: 'Slim',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    featuredLook: 'Urban Streetwear Layer',
    followers: '98K',
    matchingCategory: 'Streetwear',
    outfitImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    totalCost: '$56.00 SGD',
    outfit: {
      top: 'Boxy Graphic Heavyweight Tee ($24.00)',
      bottom: 'Wide-Leg Baggy Indigo Denim ($32.00)',
      outer: 'Cropped Denim Jacket ($0 - Owned)',
      shoes: 'Retro Canvas Kicks ($0 - Owned)'
    }
  },
  {
    id: 'c3',
    name: 'Devon Vance',
    handle: '@devon_fits',
    height: 185,
    waist: 34,
    build: 'Muscular',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    featuredLook: 'Vacation Linen Elegance',
    followers: '210K',
    matchingCategory: 'Vacation',
    outfitImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    totalCost: '$57.90 SGD',
    outfit: {
      top: 'Open Collar Linen Shirt ($29.90)',
      bottom: 'Tailored Cream Shorts ($28.00)',
      outer: 'None',
      shoes: 'Leather Penny Loafers ($0 - Owned)'
    }
  },
  {
    id: 'c4',
    name: 'Chloe Lin',
    handle: '@chloecouture',
    height: 170,
    waist: 28,
    build: 'Regular',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    featuredLook: 'Formal Evening Gala',
    followers: '315K',
    matchingCategory: 'Formal',
    outfitImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    totalCost: '$127.00 SGD',
    outfit: {
      top: 'Silk Draped Satin Top ($0 - Owned)',
      bottom: 'High-Waisted Wide Trousers ($48.00)',
      outer: 'Tailored Single Blazer ($79.00)',
      shoes: 'Pointed Slingback Heels ($0 - Owned)'
    }
  }
];

export const TEMPLATES = [
  {
    id: 't1',
    title: 'Contemporary Smart Casual',
    category: 'Smart Casual',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=80',
    description: 'Perfect for casual Friday office hours or evening dinner dates.',
    ownedCount: 3,
    missingCount: 1,
    missingItemName: 'Textured Linen Blend Blazer',
    missingItemPrice: 49.90,
    affiliateLink: 'https://www.zalora.sg/',
    merchant: 'Zalora SG',
    colorsAvailable: ['#18181b', '#d4b996', '#1e293b', '#475569']
  },
  {
    id: 't2',
    title: 'Tokyo Streetwear Black Tee',
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
    description: 'Black photo tee paired with olive cargo pants and beanie.',
    ownedCount: 2,
    missingCount: 1,
    missingItemName: 'Wide-Leg Olive Cargo Pants',
    missingItemPrice: 28.90,
    affiliateLink: 'https://shopee.sg/',
    merchant: 'Shopee Mall',
    colorsAvailable: ['#18181b', '#3f6212', '#27272a']
  },
  {
    id: 't3',
    title: 'Monochrome Formal Pinstripe Suit',
    category: 'Formal',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    description: 'Tailored blue pinstripe suit with white dress shirt and monk straps.',
    ownedCount: 2,
    missingCount: 1,
    missingItemName: 'Double-Monk Strap Leather Shoes',
    missingItemPrice: 68.00,
    affiliateLink: 'https://www.zalora.sg/',
    merchant: 'Zalora SG',
    colorsAvailable: ['#1e1b4b', '#09090b', '#3f3f46']
  },
  {
    id: 't4',
    title: 'Nike Performance Athletic Sportswear',
    category: 'Sportswear',
    image: 'https://images.unsplash.com/photo-1483721074892-4a8580712694?w=600&auto=format&fit=crop&q=80',
    description: 'Black Dri-FIT performance athletic tee, black joggers & Nike running shoes.',
    ownedCount: 2,
    missingCount: 1,
    missingItemName: 'Nike Dri-FIT Performance Joggers',
    missingItemPrice: 39.90,
    affiliateLink: 'https://www.nike.com/sg/',
    merchant: 'Nike Official Store',
    colorsAvailable: ['#18181b', '#27272a', '#ffffff']
  },
  {
    id: 't5',
    title: 'Resort Vacation Linen',
    category: 'Vacation',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    description: 'Lightweight breathable fabrics designed for tropical getaways.',
    ownedCount: 1,
    missingCount: 2,
    missingItemName: 'Camp-Collar Sage Green Shirt',
    missingItemPrice: 24.90,
    affiliateLink: 'https://www.asos.com/',
    merchant: 'ASOS Official',
    colorsAvailable: ['#15803d', '#f59e0b', '#0284c7', '#ffffff']
  }
];

export const STORE_TIERS = [
  {
    id: 'budget',
    label: 'Under $30 SGD',
    sublabel: 'Budget Stores (Shopee / Shein / Taobao)',
    min: 0,
    max: 30,
    stores: ['Shopee Mall', 'Shein SG']
  },
  {
    id: 'mid',
    label: '$30 - $80 SGD',
    sublabel: 'Mid-Range Stores (Uniqlo / ZARA / Cotton On)',
    min: 30,
    max: 80,
    stores: ['Uniqlo Official', 'ZARA']
  },
  {
    id: 'premium',
    label: '$80 - $150 SGD',
    sublabel: 'Premium Stores (Zalora / ASOS / Mango)',
    min: 80,
    max: 150,
    stores: ['Zalora SG', 'ASOS Official']
  },
  {
    id: 'luxury',
    label: '$150+ SGD',
    sublabel: 'Luxury & Designer Stores (Nike / Coach)',
    min: 150,
    max: 999,
    stores: ['Nike Official Store']
  },
  {
    id: 'all',
    label: 'All Prices',
    sublabel: 'Show All Brand Store Recommendations',
    min: 0,
    max: 999,
    stores: ['All Stores']
  }
];

export const AFFILIATE_PRODUCTS = [
  {
    id: 'p1',
    name: 'Uniqlo AIRism Cotton Oversized Tee',
    price: 19.90,
    rating: 4.9,
    merchant: 'UNIQLO OFFICIAL',
    url: 'https://www.uniqlo.com/sg/en/',
    commissionRate: '8%',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Purple', hex: '#6b21a8' },
      { name: 'Black', hex: '#18181b' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Olive', hex: '#3f6212' }
    ]
  },
  {
    id: 'p2',
    name: 'Shopee Preferred Wide-Leg Denim',
    price: 15.80,
    rating: 4.8,
    merchant: 'SHOPEE MALL (CHEAPEST VERIFIED)',
    url: 'https://shopee.sg/',
    commissionRate: '12%',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Indigo Blue', hex: '#1e1b4b' },
      { name: 'Washed Black', hex: '#27272a' },
      { name: 'Raw Denim', hex: '#0f172a' }
    ]
  },
  {
    id: 'p3',
    name: 'Zalora Essentials Linen Blend Blazer',
    price: 45.00,
    rating: 4.7,
    merchant: 'ZALORA SG',
    url: 'https://www.zalora.sg/',
    commissionRate: '15%',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Sand Beige', hex: '#d4b996' },
      { name: 'Navy Blue', hex: '#1e293b' },
      { name: 'Emerald Green', hex: '#065f46' }
    ]
  },
  {
    id: 'p4',
    name: 'ASOS Minimalist White Leather Sneakers',
    price: 38.50,
    rating: 4.6,
    merchant: 'ASOS OFFICIAL',
    url: 'https://www.asos.com/',
    commissionRate: '10%',
    category: 'Shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Minimal White', hex: '#f8fafc' },
      { name: 'Off-White Cream', hex: '#fef3c7' }
    ]
  },
  {
    id: 'p5',
    name: 'Shein Casual Ribbed Knit Crop Top',
    price: 9.90,
    rating: 4.5,
    merchant: 'SHEIN SG',
    url: 'https://sg.shein.com/',
    commissionRate: '14%',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Sage Green', hex: '#15803d' },
      { name: 'Soft Cream', hex: '#fef3c7' }
    ]
  },
  {
    id: 'p6',
    name: 'Nike Dri-FIT Tech Fleece Joggers',
    price: 119.00,
    rating: 4.9,
    merchant: 'NIKE OFFICIAL STORE',
    url: 'https://www.nike.com/sg/',
    commissionRate: '9%',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1483721074892-4a8580712694?w=300&auto=format&fit=crop&q=80',
    colors: [
      { name: 'Heather Grey', hex: '#71717a' },
      { name: 'Obsidian Black', hex: '#09090b' }
    ]
  }
];
