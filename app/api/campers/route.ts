// app/api/campers/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../api";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build query params for MockAPI backend filtering
    const params: Record<string, string | boolean> = {};

    // Pagination
    params.page = searchParams.get("page") || "1";
    params.limit = searchParams.get("limit") || "4";

    // Text filters
    const location = searchParams.get("location");
    const form = searchParams.get("form");
    const transmission = searchParams.get("transmission");

    if (location) params.location = location;
    if (form) params.form = form;
    if (transmission) params.transmission = transmission;

    // Boolean filters
    const booleanFilters = [
      "AC",
      "bathroom",
      "kitchen",
      "TV",
      "radio",
      "refrigerator",
      "microwave",
      "gas",
      "water",
    ];

    booleanFilters.forEach((filter) => {
      if (searchParams.get(filter) === "true") {
        params[filter] = true;
      }
    });

    // Fetch from MockAPI using Axios
    const { data } = await api.get("/campers", { params });

    return NextResponse.json(data);
  } catch (error) {
    const apiError = error as ApiError;

    console.error("Error fetching campers:", apiError.message);

    // Return error message from backend or default message
    const errorMessage =
      apiError.response?.data?.error || "Failed to fetch campers";

    return NextResponse.json(
      { error: errorMessage },
      { status: apiError.response?.status || 500 }
    );
  }
}
