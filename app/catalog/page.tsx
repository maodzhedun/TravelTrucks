// app/catalog/page.tsx

import { Suspense } from "react";
import { fetchCampers } from "@/lib/api/serverApi";
import CatalogClient from "./CatalogClient";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";
import { Camper } from "@/types/camper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TravelTrucks - Catalog",
  description: "Browse our collection of campervans and motorhomes for rent.",
};

async function getCampers(): Promise<{ items: Camper[]; total: number }> {
  try {
    const data = await fetchCampers({}, 1, 4);
    return { items: data.items, total: data.total };
  } catch (error) {
    console.error("Failed to fetch campers:", error);
    return { items: [], total: 0 };
  }
}

async function CatalogContent() {
  const { items, total } = await getCampers();

  return <CatalogClient initialCampers={items} initialTotal={total} />;
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <CatalogContent />
    </Suspense>
  );
}
