"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camper } from "@/types/camper";
import { useFavoritesStore } from "@/lib/store/favoritesStore";
import Badge from "@/components/Badge/Badge";
import Icon, { IconName } from "@/components/Icon/Icon";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
  index?: number;
}

const CamperCard = ({ camper, index = 0 }: CamperCardProps) => {
  const [mounted, setMounted] = useState(false);
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const favorite = mounted ? isFavorite(camper.id) : false;
  const formattedPrice = `\u20AC${camper.price.toFixed(2)}`;
  const formattedLocation = camper.location.split(", ").reverse().join(", ");

  const features = useMemo(() => {
    const list: { key: string; label: string; icon: IconName }[] = [];

    if (camper.transmission === "automatic") {
      list.push({ key: "automatic", label: "Automatic", icon: "automatic" });
    }
    if (camper.engine) {
      const engineLabel =
        camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1);
      list.push({ key: "engine", label: engineLabel, icon: "petrol" });
    }
    if (camper.AC) list.push({ key: "ac", label: "AC", icon: "ac" });
    if (camper.kitchen)
      list.push({ key: "kitchen", label: "Kitchen", icon: "kitchen" });
    if (camper.TV) list.push({ key: "tv", label: "TV", icon: "tv" });
    if (camper.bathroom)
      list.push({ key: "bathroom", label: "Bathroom", icon: "bathroom" });
    if (camper.radio)
      list.push({ key: "radio", label: "Radio", icon: "radio" });
    if (camper.refrigerator)
      list.push({
        key: "refrigerator",
        label: "Refrigerator",
        icon: "refrigerator",
      });

    return list;
  }, [camper]);

  // First card gets priority loading for LCP optimization
  const isPriority = index === 0;

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={
            camper.gallery[0]?.thumb ||
            camper.gallery[0]?.original ||
            "/placeholder.jpg"
          }
          alt={camper.name}
          fill
          sizes="292px"
          priority={isPriority}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{camper.name}</h3>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            <button
              className={styles.favoriteBtn}
              onClick={() => toggleFavorite(camper.id)}
              aria-label={
                favorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Icon
                name={favorite ? "heart-filled" : "heart"}
                size={24}
                color={favorite ? "#E44848" : "#101828"}
              />
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            <Icon name="star-filled" size={16} color="#FFC531" />
            <span className={styles.ratingText}>
              {camper.rating}({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <Icon name="location" size={16} />
            <span>{formattedLocation}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          {features.slice(0, 6).map((feature) => (
            <Badge
              key={feature.key}
              icon={<Icon name={feature.icon} size={20} />}
            >
              {feature.label}
            </Badge>
          ))}
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.showMoreBtn}>
          Show more
        </Link>
      </div>
    </article>
  );
};

export default CamperCard;
