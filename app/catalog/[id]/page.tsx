import { Suspense } from "react";
import { fetchCamperById } from "@/lib/api/serverApi";
import CamperDetailsClient from "./CamperDetails.client";
import Loader from "@/components/Loader/Loader";
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

async function CamperContent({ id }: { id: string }) {
  const camper = await fetchCamperById(id).catch(() => null);

  if (!camper) {
    notFound();
  }

  return <CamperDetailsClient camper={camper} />;
}

export default async function CamperPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense fallback={<Loader fullPage />}>
      <CamperContent id={id} />
    </Suspense>
  );
}