// app/catalog/page.tsx

import { getCampers } from "@/lib/api";
import CatalogClient from "./CatalogClient";

export default async function CatalogPage() {
  // Дані завантажуються на сервері
  const data = await getCampers({}, 1, 4);

  return (
    <CatalogClient initialCampers={data.items} initialTotal={data.total} />
  );
}
