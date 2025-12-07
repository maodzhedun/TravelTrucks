// app/api/api.ts

import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Type for API error responses
export type ApiError = AxiosError<{ error: string }>;

// Axios instance configured for MockAPI
export const api = axios.create({
  baseURL,
});
