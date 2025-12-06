// Types for Camper data structure

export interface GalleryImage {
  thumb: string;
  original: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: "alcove" | "fullyIntegrated" | "panelTruck";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: "automatic" | "manual";
  engine: "diesel" | "petrol" | "hybrid";
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryImage[];
  reviews: Review[];
}

export interface CampersResponse {
  total: number;
  items: Camper[];
}

// Filter types for backend filtering
export interface Filters {
  location?: string;
  form?: "alcove" | "fullyIntegrated" | "panelTruck";
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  transmission?: "automatic" | "manual";
}

// Form types for display
export const FORM_TYPES: Record<string, string> = {
  alcove: "Alcove",
  fullyIntegrated: "Fully Integrated",
  panelTruck: "Van",
};
