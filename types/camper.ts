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
}

export interface CampersResponse {
  total: number;
  items: Camper[];
}

// Filter types
export interface Filters {
  location?: string;
  form?: "alcove" | "fullyIntegrated" | "panelTruck" | "";
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  transmission?: "automatic" | "manual" | "";
}

// Booking form data
export interface BookingFormData {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
}

// Form types for display
export const FORM_TYPES: Record<string, string> = {
  alcove: "Alcove",
  fullyIntegrated: "Fully Integrated",
  panelTruck: "Panel Truck",
};
