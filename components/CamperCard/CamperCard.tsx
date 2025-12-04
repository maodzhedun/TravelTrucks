'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camper } from '@/types/camper';
import { useCampersStore } from '@/store/useCampersStore';
import Badge from '@/components/Badge/Badge';
import styles from './CamperCard.module.css';

// SVG Icons matching Figma
const icons = {
  star: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFC531">
      <path d="M7.053 1.276a1 1 0 0 1 1.894 0l1.294 3.81a1 1 0 0 0 .912.682l4.003.085a1 1 0 0 1 .586 1.797l-3.182 2.455a1 1 0 0 0-.35 1.073l1.138 3.864a1 1 0 0 1-1.532 1.111L8.52 13.93a1 1 0 0 0-1.04 0l-3.296 2.223a1 1 0 0 1-1.532-1.111l1.138-3.864a1 1 0 0 0-.35-1.073L.258 7.65a1 1 0 0 1 .586-1.797l4.003-.085a1 1 0 0 0 .912-.683l1.294-3.81Z" />
    </svg>
  ),
  location: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 14s5-3.5 5-7a5 5 0 1 0-10 0c0 3.5 5 7 5 7Z" />
    </svg>
  ),
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  heartFilled: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E44848" stroke="#E44848" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  // Equipment icons
  automatic: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41" />
    </svg>
  ),
  petrol: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M3 17V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12M3 17h10M3 8h10" />
      <path d="M13 8l2-2a1 1 0 0 1 1.5 0l.5.5a1 1 0 0 1 0 1.5L15 10v4a1 1 0 0 1-1 1h-1" />
    </svg>
  ),
  kitchen: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M3 3v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3M5 3v14M14 3v2a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1h-2M14 10v7" />
    </svg>
  ),
  ac: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M10 3v14M6 7c2-2 6-2 8 0M6 13c2 2 6 2 8 0" />
    </svg>
  ),
  tv: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <rect x="2" y="5" width="16" height="11" rx="1" />
      <path d="M7 2l3 3 3-3" />
    </svg>
  ),
  bathroom: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M3 10h14M3 10V6a2 2 0 0 1 2-2h2M3 10v4a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-4" />
    </svg>
  ),
  radio: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <circle cx="10" cy="10" r="2" />
      <path d="M4.93 4.93a8 8 0 0 1 10.14 0M7.17 7.17a4 4 0 0 1 5.66 0M15.07 4.93a8 8 0 0 1 0 10.14M12.83 7.17a4 4 0 0 1 0 5.66M4.93 15.07a8 8 0 0 1 0-10.14M7.17 12.83a4 4 0 0 1 0-5.66" />
    </svg>
  ),
  refrigerator: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <rect x="4" y="2" width="12" height="16" rx="1" />
      <path d="M4 8h12M13 5v2M13 11v3" />
    </svg>
  ),
  microwave: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <rect x="2" y="4" width="16" height="12" rx="1" />
      <rect x="4" y="6" width="8" height="8" rx="0.5" />
      <circle cx="15" cy="8" r="0.5" fill="#101828" />
      <circle cx="15" cy="12" r="0.5" fill="#101828" />
    </svg>
  ),
  gas: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M10 2c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" />
      <path d="M10 7c1.5 2 2.5 3 2.5 4.5a2.5 2.5 0 0 1-5 0c0-1.5 1-2.5 2.5-4.5Z" />
    </svg>
  ),
  water: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M10 2c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
    </svg>
  ),
};

interface CamperCardProps {
  camper: Camper;
}

const CamperCard = ({ camper }: CamperCardProps) => {
  const { toggleFavorite, isFavorite } = useCampersStore();
  const favorite = isFavorite(camper.id);

  const formattedPrice = `€${camper.price.toFixed(2)}`;
  const formattedLocation = camper.location.split(', ').reverse().join(', ');

  const features = useMemo(() => {
    const list: { key: string; label: string; icon: JSX.Element }[] = [];

    if (camper.transmission === 'automatic') {
      list.push({ key: 'automatic', label: 'Automatic', icon: icons.automatic });
    }
    if (camper.engine) {
      list.push({ key: 'engine', label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: icons.petrol });
    }
    if (camper.AC) list.push({ key: 'ac', label: 'AC', icon: icons.ac });
    if (camper.kitchen) list.push({ key: 'kitchen', label: 'Kitchen', icon: icons.kitchen });
    if (camper.TV) list.push({ key: 'tv', label: 'TV', icon: icons.tv });
    if (camper.bathroom) list.push({ key: 'bathroom', label: 'Bathroom', icon: icons.bathroom });
    if (camper.radio) list.push({ key: 'radio', label: 'Radio', icon: icons.radio });
    if (camper.refrigerator) list.push({ key: 'refrigerator', label: 'Refrigerator', icon: icons.refrigerator });

    return list;
  }, [camper]);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.gallery[0]?.original || '/placeholder.jpg'}
          alt={camper.name}
          fill
          sizes="292px"
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
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {favorite ? icons.heartFilled : icons.heart}
            </button>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.rating}>
            {icons.star}
            <span className={styles.ratingText}>
              {camper.rating}({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            {icons.location}
            <span>{formattedLocation}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          {features.map((feature) => (
            <Badge key={feature.key} icon={feature.icon}>
              {feature.label}
            </Badge>
          ))}
        </div>

        <Link href={`/catalog/${camper.id}`}>
          <button className={styles.showMoreBtn}>Show more</button>
        </Link>
      </div>
    </article>
  );
};

export default CamperCard;
