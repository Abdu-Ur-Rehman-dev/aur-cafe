export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'coldbrew' | 'lattes' | 'beans';
  price: number;
  description: string;
  image: string;
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  tastingNotes: string[];
  origin?: string;
  sweetnessDefault?: number;
  featured?: boolean;
}

export interface CustomBrewOptions {
  milk: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Macadamia Milk' | 'Whole Cream' | 'None';
  shots: number;
  sweetness: number; // 0, 25, 50, 75, 100
  syrup: 'None' | 'Bourbon Vanilla' | 'Raw Honey Caramel' | 'Dark Hazelnut' | 'Cardamom Spice';
  temperature: 'Hot' | 'Iced' | 'Extra Hot';
  specialNotes?: string;
}

export interface CartItem {
  id: string; // unique cart line item id
  menuItem: MenuItem;
  customOptions?: CustomBrewOptions;
  quantity: number;
  unitPrice: number;
}

export interface SpecialtyItem {
  id: string;
  name: string;
  category: 'croissant' | 'tart' | 'dessert' | 'danish';
  price: number;
  description: string;
  image: string;
  pairing: string;
  prepTime: string;
  allergens: string[];
}

export interface OriginBean {
  id: string;
  name: string;
  country: string;
  region: string;
  altitude: string;
  process: string;
  flavorProfile: {
    acidity: number;
    body: number;
    sweetness: number;
    floral: number;
    nutty: number;
  };
  tastingNotes: string[];
  description: string;
  pricePer250g: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  description: string;
  cameraInfo: string;
}

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  experienceType: 'Standard Table' | 'Chef Tasting Bar' | 'Private Roastery Lounge';
  specialRequests?: string;
}
