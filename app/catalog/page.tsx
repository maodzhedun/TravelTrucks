// app/catalog/page.tsx

import { Suspense } from "react";
import { fetchCampers } from "@/lib/api/serverApi";
import CatalogClient from "./CatalogClient";
import Loader from "@/components/Loader/Loader";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TravelTrucks - Catalog",
  description: "Browse our collection of campervans and motorhomes for rent.",
};

async function CatalogContent() {
  const data = await fetchCampers({}, 1, 4);

  return (
    <CatalogClient initialCampers={data.items} initialTotal={data.total} />
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<Loader fullPage />}>
      <CatalogContent />
    </Suspense>
  );
}
