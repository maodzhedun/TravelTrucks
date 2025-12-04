// app/catalog/CatalogClient.tsx

"use client";

import { useState } from "react";
import { Camper, Filters } from "@/types/camper";
import { fetchCampers } from "@/lib/api/clientApi";
import FiltersComponent from "@/components/Filters/Filters";
import CamperList from "@/components/CamperList/CamperList";
import Loader from "@/components/Loader/Loader";
import styles from "./page.module.css";

interface CatalogClientProps {
  initialCampers: Camper[];
  initialTotal: number;
}

export default function CatalogClient({
  initialCampers,
  initialTotal,
}: CatalogClientProps) {
  const [campers, setCampers] = useState<Camper[]>(initialCampers);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(false);

  // Search with new filters - backend filtering
  const handleSearch = async (newFilters: Filters) => {
    setIsLoading(true);
    // Reset previous results before new search (РўР— requirement)
    setCampers([]);
    setFilters(newFilters);

    try {
      // Backend handles filtering
      const data = await fetchCampers(newFilters, 1, 4);
      setCampers(data.items);
      setTotal(data.total);
      setPage(1);
    } catch (error) {
      console.error("Error fetching campers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more - backend pagination
  const handleLoadMore = async () => {
    setIsLoading(true);
    const nextPage = page + 1;

    try {
      // Backend handles pagination with current filters
      const data = await fetchCampers(filters, nextPage, 4);
      setCampers((prev) => [...prev, ...data.items]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasMore = campers.length < total;

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <FiltersComponent onSearch={handleSearch} />

        <div className={styles.content}>
          {campers.length > 0 ? (
            <CamperList campers={campers} />
          ) : !isLoading ? (
            <div className={styles.empty}>
              <h3>No campers found</h3>
              <p>Try adjusting your filters to find more results.</p>
            </div>
          ) : null}

          {isLoading && <Loader />}

          {hasMore && !isLoading && (
            <div className={styles.loadMoreWrapper}>
              <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
                Load more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
