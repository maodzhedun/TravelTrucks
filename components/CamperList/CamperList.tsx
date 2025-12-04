// components/CamperList/CamperList.tsx
"use client";

import { Camper } from "@/types/camper";
import { useCampersStore } from "@/store/useCampersStore";
import CamperCard from "@/components/CamperCard/CamperCard";
import Loader from "@/components/Loader/Loader";
import styles from "./CamperList.module.css";

interface CamperListProps {
  campers?: Camper[];
  total?: number;
}

const CamperList = ({
  campers: propsCampers,
  total: propsTotal,
}: CamperListProps) => {
  const store = useCampersStore();

  // Використовуємо props або store
  const campers = propsCampers ?? store.campers;
  const total = propsTotal ?? store.total;
  const { isLoading, error, loadMore } = store;

  const hasMore = campers.length < total;

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  if (!isLoading && campers.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No campers found</h3>
        <p>Try adjusting your filters to find more results.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {isLoading && (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      )}

      {hasMore && !isLoading && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMoreBtn} onClick={loadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default CamperList;
