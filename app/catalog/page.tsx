// app/catalog/page.tsx

import { fetchCampers } from "@/lib/api/serverApi";
import CatalogClient from "./CatalogClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TravelTrucks - Catalog",
  description: "Browse our collection of campervans and motorhomes for rent.",
};

export default async function CatalogPage() {
  // Fetch initial data on server
  const data = await fetchCampers({}, 1, 4);

  return (
    <CatalogClient initialCampers={data.items} initialTotal={data.total} />
  );
}
