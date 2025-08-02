import type { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'daily-discovery',
    name: 'Daily Discovery',
    image: 'https://ext.same-assets.com/2323672905/935825445.png',
    description: 'Discover something new every day',
    slug: 'daily-discovery'
  },
  {
    id: 'home-gadgets',
    name: 'Home Gadgets',
    image: 'https://ext.same-assets.com/2323672905/112778474.png',
    description: 'Smart solutions for your home',
    slug: 'home-gadgets'
  },
  {
    id: 'home-stuff',
    name: 'Home Stuff',
    image: 'https://ext.same-assets.com/2323672905/473488548.jpeg',
    description: 'Everything you need for your home',
    slug: 'home-stuff'
  },
  {
    id: 'kitchen-gadgets',
    name: 'Kitchen Gadgets',
    image: 'https://ext.same-assets.com/2323672905/3390113529.png',
    description: 'Innovative kitchen solutions',
    slug: 'kitchen-gadgets'
  },
  {
    id: 'bed-bath',
    name: 'Bed & Bath',
    image: 'https://ext.same-assets.com/2323672905/686821920.png',
    description: 'Comfort for your bedroom and bathroom',
    slug: 'bed-bath'
  },
  {
    id: 'bathroom-organizers',
    name: 'Bathroom Organizers',
    image: 'https://ext.same-assets.com/2323672905/2408049069.png',
    description: 'Organize your bathroom space',
    slug: 'bathroom-organizers'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Nordic Unique Wooden Outdoor Wall Vase Lamp',
    description: 'A beautiful combination of lighting and nature. This unique wooden wall vase lamp brings warmth and style to any outdoor space.',
    price: 57.95,
    images: [
      'https://ext.same-assets.com/2323672905/1760573335.jpeg',
      'https://ext.same-assets.com/2323672905/4015586401.jpeg'
    ],
    category: 'home-gadgets',
    subcategory: 'lamps',
    tags: ['lamp', 'wooden', 'outdoor', 'vase', 'nordic'],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Astronaut On The Moon Wall Light',
    description: 'Transform your space with this whimsical astronaut wall light. Perfect for creating a dreamy atmosphere in any room.',
    price: 90.95,
    images: [
      'https://ext.same-assets.com/2323672905/4201567472.jpeg',
      'https://ext.same-assets.com/2323672905/3940175560.jpeg'
    ],
    category: 'home-gadgets',
    subcategory: 'lamps',
    tags: ['astronaut', 'wall light', 'moon', 'space', 'decorative'],
    inStock: true,
    rating: 4.9,
    reviews: 89,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Unique Retro Creative Animals Table Lamps',
    description: 'Add personality to your space with these creative animal-shaped table lamps. Each lamp features unique retro styling.',
    price: 93.95,
    images: [
      'https://ext.same-assets.com/2323672905/5485459.jpeg',
      'https://ext.same-assets.com/2323672905/1755968972.jpeg'
    ],
    category: 'home-gadgets',
    subcategory: 'lamps',
    tags: ['animals', 'table lamp', 'retro', 'creative', 'decorative'],
    inStock: true,
    rating: 4.7,
    reviews: 156,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Aromatherapy Car RGB Rhythm Light',
    description: 'Experience relaxation on the go with this aromatherapy car light that syncs with music and changes colors.',
    price: 89.95,
    images: [
      'https://ext.same-assets.com/2323672905/660400158.jpeg',
      'https://ext.same-assets.com/2323672905/499156803.jpeg'
    ],
    category: 'daily-discovery',
    subcategory: 'car-accessories',
    tags: ['aromatherapy', 'car', 'rgb', 'rhythm', 'light'],
    inStock: true,
    rating: 4.6,
    reviews: 203,
    isFeatured: true
  },
  {
    id: '5',
    name: 'Nordic Rain LED Thermostatic Waterfall Shower Set',
    description: 'Luxury shower experience with LED lighting, thermostatic control, and waterfall design.',
    price: 1600.95,
    images: [
      'https://ext.same-assets.com/2323672905/4073060621.jpeg',
      'https://ext.same-assets.com/2323672905/1929030353.jpeg'
    ],
    category: 'bed-bath',
    subcategory: 'shower',
    tags: ['shower', 'led', 'thermostatic', 'waterfall', 'luxury'],
    inStock: true,
    rating: 4.9,
    reviews: 67,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Simple Harmony Ceramic Tea Pot Set',
    description: 'Elegant ceramic tea pot set perfect for tea ceremonies and daily use. Includes multiple cups and serving tray.',
    price: 69.95,
    images: [
      'https://ext.same-assets.com/2323672905/1690814803.jpeg',
      'https://ext.same-assets.com/2323672905/1454112268.jpeg'
    ],
    category: 'kitchen-gadgets',
    subcategory: 'tea-coffee',
    tags: ['tea pot', 'ceramic', 'harmony', 'set', 'traditional'],
    inStock: true,
    rating: 4.8,
    reviews: 92
  },
  {
    id: '7',
    name: 'Ultimate Camping Style Stainless Steel Foldable Grill',
    description: 'Portable and durable stainless steel grill perfect for camping, outdoor parties, and backyard cooking.',
    price: 94.95,
    originalPrice: 115.95,
    discount: 18,
    images: [
      'https://ext.same-assets.com/2323672905/4020868118.jpeg'
    ],
    category: 'daily-discovery',
    subcategory: 'outdoor',
    tags: ['grill', 'camping', 'stainless steel', 'foldable', 'portable'],
    inStock: true,
    rating: 4.7,
    reviews: 78
  },
  {
    id: '8',
    name: 'Minimalist LED Circle Background Wall Lamp',
    description: 'Modern minimalist wall lamp with circular LED design. Creates ambient lighting perfect for any contemporary space.',
    price: 41.95,
    images: [
      'https://ext.same-assets.com/2323672905/912222953.jpeg',
      'https://ext.same-assets.com/2323672905/1614771366.jpeg'
    ],
    category: 'home-gadgets',
    subcategory: 'lamps',
    tags: ['minimalist', 'led', 'circle', 'wall lamp', 'modern'],
    inStock: true,
    rating: 4.5,
    reviews: 134
  },
  {
    id: '9',
    name: '3D LED Painting Sand Art Decor',
    description: 'Mesmerizing 3D LED sand art that creates beautiful patterns. Remote controlled with multiple color options.',
    price: 64.95,
    images: [
      'https://ext.same-assets.com/2323672905/2945440613.jpeg',
      'https://ext.same-assets.com/2323672905/1402462063.jpeg'
    ],
    category: 'home-stuff',
    subcategory: 'decorative',
    tags: ['3d', 'led', 'sand art', 'painting', 'decorative'],
    inStock: true,
    rating: 4.6,
    reviews: 187
  },
  {
    id: '10',
    name: 'Corner Embedded Chic Bridal Scene Night Lamp',
    description: 'Elegant corner lamp with embedded bridal scene. Perfect for creating romantic ambiance in bedrooms.',
    price: 260.00,
    images: [
      'https://ext.same-assets.com/2323672905/839499215.jpeg',
      'https://ext.same-assets.com/2323672905/1074450470.jpeg'
    ],
    category: 'home-gadgets',
    subcategory: 'lamps',
    tags: ['corner', 'bridal', 'night lamp', 'romantic', 'embedded'],
    inStock: true,
    rating: 4.4,
    reviews: 45
  },
  {
    id: '11',
    name: 'Cuddly Capybara Cozy Wrap Sleeve Plush Band',
    description: 'Adorable capybara plush wrap that provides comfort and warmth. Perfect for relaxation and stress relief.',
    price: 10.95,
    images: [
      'https://ext.same-assets.com/2323672905/1670575460.jpeg',
      'https://ext.same-assets.com/2323672905/683694440.jpeg'
    ],
    category: 'daily-discovery',
    subcategory: 'comfort',
    tags: ['capybara', 'plush', 'cozy', 'wrap', 'comfort'],
    inStock: true,
    rating: 4.9,
    reviews: 312,
    isNew: true
  },
  {
    id: '12',
    name: 'Gun Shape Bullet Glass Decanter Set',
    description: 'Unique gun-shaped glass decanter set perfect for whiskey enthusiasts. Includes matching glasses.',
    price: 49.95,
    originalPrice: 77.95,
    discount: 35,
    images: [
      'https://ext.same-assets.com/2323672905/1302975183.jpeg'
    ],
    category: 'home-stuff',
    subcategory: 'barware',
    tags: ['gun', 'decanter', 'whiskey', 'glass', 'unique'],
    inStock: true,
    rating: 4.3,
    reviews: 89
  }
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};
