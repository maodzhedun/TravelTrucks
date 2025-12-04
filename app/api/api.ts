// app/api/api.ts

import axios, { AxiosError } from "axios";

// Type for API error responses
export type ApiError = AxiosError<{ error: string }>;

// Axios instance configured for MockAPI
export const api = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});
