// app/catalog/CatalogClient.tsx
"use client";

import { useEffect, useCallback } from "react";
import { Camper } from "@/types/camper";
import { useCampersStore } from "@/store/useCampersStore";
import Filters from "@/components/Filters/Filters";
import CamperList from "@/components/CamperList/CamperList";
import styles from "./page.module.css";

interface CatalogClientProps {
  initialCampers: Camper[];
  initialTotal: number;
}

export default function CatalogClient({
  initialCampers,
  initialTotal,
}: CatalogClientProps) {
  const { campers, setCampers, setTotal } = useCampersStore();

  // Ініціалізувати store даними з сервера
  useEffect(() => {
    if (campers.length === 0 && initialCampers.length > 0) {
      setCampers(initialCampers);
      setTotal(initialTotal);
    }
  }, [initialCampers, initialTotal, campers.length, setCampers, setTotal]);

  // Використовуємо дані зі store, або початкові з сервера
  const displayCampers = campers.length > 0 ? campers : initialCampers;
  const displayTotal =
    campers.length > 0 ? useCampersStore.getState().total : initialTotal;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Filters />
        <CamperList campers={displayCampers} total={displayTotal} />
      </div>
    </div>
  );
}
