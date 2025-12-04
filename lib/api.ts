// lib/api.ts

import axios from "axios";
import { Camper, CampersResponse, Filters } from "@/types/camper";

const API_BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Build query params from filters
const buildFilterParams = (
  filters: Filters
): Record<string, string | boolean> => {
  const params: Record<string, string | boolean> = {};

  if (filters.location) {
    params.location = filters.location;
  }

  if (filters.form) {
    params.form = filters.form;
  }

  if (filters.AC) params.AC = true;
  if (filters.bathroom) params.bathroom = true;
  if (filters.kitchen) params.kitchen = true;
  if (filters.TV) params.TV = true;
  if (filters.radio) params.radio = true;
  if (filters.refrigerator) params.refrigerator = true;
  if (filters.microwave) params.microwave = true;
  if (filters.gas) params.gas = true;
  if (filters.water) params.water = true;
  if (filters.transmission) params.transmission = filters.transmission;

  return params;
};

// Get all campers with optional filters and pagination
export const getCampers = async (
  filters: Filters = {},
  page: number = 1,
  limit: number = 4
): Promise<CampersResponse> => {
  const filterParams = buildFilterParams(filters);

  // API повертає {total, items} - НЕ масив!
  const response = await api.get<CampersResponse>("/campers", {
    params: {
      ...filterParams,
      page,
      limit,
    },
  });

  return response.data;
};

// Get single camper by ID
export const getCamperById = async (id: string): Promise<Camper> => {
  const response = await api.get<Camper>(`/campers/${id}`);
  return response.data;
};
