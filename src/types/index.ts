export interface Property {
  id: string;
  title: string;
  slug: string;
  status: 'buy' | 'rent';
  type: 'apartment' | 'house' | 'commercial' | 'villa';
  area: string;
  price: number;
  beds?: number;
  baths?: number;
  interiorSize?: number;
  plotSize?: number;
  yearBuilt?: number;
  description: string;
  features: string[];
  images: PropertyImage[];
  videoUrl?: string;
  matterportUrl?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  agent: Agent;
  referenceId: string;
  availability: 'available' | 'sold' | 'rented' | 'pending';
  seo: {
    title: string;
    description: string;
  };
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  avatar: string;
  languages: string[];
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  heroImage: string;
  shortDescription: string;
  lifestyleDescription: string;
  mapBounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  seo: {
    title: string;
    description: string;
  };
}

export interface SearchFilters {
  purpose?: 'buy' | 'rent';
  type?: string[];
  location?: string;
  priceMin?: number;
  priceMax?: number;
  beds?: number;
  baths?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc';
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  reason?: 'buying' | 'selling' | 'renting';
  propertyId?: string;
  consent: boolean;
}

export interface NewsletterForm {
  email: string;
  consent: boolean;
}

export interface ValuationForm extends ContactForm {
  propertyLocation: string;
  propertyType: string;
  estimatedPrice?: number;
  contactMethod: 'phone' | 'email' | 'whatsapp';
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'buyer' | 'seller' | 'renter';
  quote: string;
  area?: string;
  rating: number;
}

export interface GlobalSettings {
  navigation: {
    [key: string]: string;
  };
  footer: {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
    };
  };
  contact: {
    office: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
}

export type Locale = 'en' | 'de' | 'es';
