// lib/api/serverApi.ts

import { Camper, CampersResponse, Filters } from "@/types/camper";
import { nextServer } from "./api";

// Build query params from filters
const buildParams = (
  filters: Filters,
  page: number,
  limit: number
): Record<string, string | boolean> => {
  const params: Record<string, string | boolean> = {};

  params.page = page.toString();
  params.limit = limit.toString();

  if (filters.location) params.location = filters.location;
  if (filters.form) params.form = filters.form;
  if (filters.transmission) params.transmission = filters.transmission;

  // Boolean filters
  if (filters.AC) params.AC = true;
  if (filters.bathroom) params.bathroom = true;
  if (filters.kitchen) params.kitchen = true;
  if (filters.TV) params.TV = true;
  if (filters.radio) params.radio = true;
  if (filters.refrigerator) params.refrigerator = true;
  if (filters.microwave) params.microwave = true;
  if (filters.gas) params.gas = true;
  if (filters.water) params.water = true;

  return params;
};

// Fetch campers with backend filtering and pagination
export const fetchCampers = async (
  filters: Filters = {},
  page: number = 1,
  limit: number = 4
): Promise<CampersResponse> => {
  const params = buildParams(filters, page, limit);
  const { data } = await nextServer.get<CampersResponse>("/campers", {
    params,
  });
  return data;
};

// Fetch single camper by ID
export const fetchCamperById = async (id: string): Promise<Camper> => {
  const { data } = await nextServer.get<Camper>(`/campers/${id}`);
  return data;
};
