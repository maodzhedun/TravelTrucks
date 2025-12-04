import { fetchCamperById } from "@/lib/api/serverApi";
import CamperDetailsClient from "./CamperDetails.client";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const camper = await fetchCamperById(id);
    return {
      title: `TravelTrucks - ${camper.name}`,
      description: camper.description,
    };
  } catch {
    return {
      title: "TravelTrucks - Camper Not Found",
    };
  }
}

export default async function CamperPage({ params }: Props) {
  const { id } = await params;

  try {
    const camper = await fetchCamperById(id);
    return <CamperDetailsClient camper={camper} />;
  } catch {
    notFound();
  }
}
