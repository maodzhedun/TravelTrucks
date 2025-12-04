// app/api/campers/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    // Fetch single camper from MockAPI using Axios
    const { data } = await api.get(`/campers/${id}`);

    return NextResponse.json(data);
  } catch (error) {
    const apiError = error as ApiError;

    console.error("Error fetching camper:", apiError.message);

    // Handle 404
    if (apiError.response?.status === 404) {
      return NextResponse.json({ error: "Camper not found" }, { status: 404 });
    }

    // Return error message from backend or default message
    const errorMessage =
      apiError.response?.data?.error || "Failed to fetch camper";

    return NextResponse.json(
      { error: errorMessage },
      { status: apiError.response?.status || 500 }
    );
  }
}
