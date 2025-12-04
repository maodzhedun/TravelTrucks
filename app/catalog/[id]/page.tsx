'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Camper } from '@/types/camper';
import { getCamperById } from '@/lib/api';
import Tabs from '@/components/Tabs/Tabs';
import Features from '@/components/Features/Features';
import Reviews from '@/components/Reviews/Reviews';
import BookingForm from '@/components/BookingForm/BookingForm';
import Loader from '@/components/Loader/Loader';
import styles from './page.module.css';

// Icons
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFC531">
    <path d="M7.053 1.276a1 1 0 0 1 1.894 0l1.294 3.81a1 1 0 0 0 .912.682l4.003.085a1 1 0 0 1 .586 1.797l-3.182 2.455a1 1 0 0 0-.35 1.073l1.138 3.864a1 1 0 0 1-1.532 1.111L8.52 13.93a1 1 0 0 0-1.04 0l-3.296 2.223a1 1 0 0 1-1.532-1.111l1.138-3.864a1 1 0 0 0-.35-1.073L.258 7.65a1 1 0 0 1 .586-1.797l4.003-.085a1 1 0 0 0 .912-.683l1.294-3.81Z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#101828" strokeWidth="1.5">
    <path d="M8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M8 14s5-3.5 5-7a5 5 0 1 0-10 0c0 3.5 5 7 5 7Z" />
  </svg>
);

export default function CamperDetailsPage() {
  const params = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCamper = async () => {
      if (!params.id) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getCamperById(params.id as string);
        setCamper(data);
      } catch (err) {
        setError('Failed to load camper details. Please try again.');
        console.error('Error fetching camper:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCamper();
  }, [params.id]);

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (error || !camper) {
    return (
      <div className={styles.error}>
        <h2>Oops!</h2>
        <p>{error || 'Camper not found'}</p>
      </div>
    );
  }

  const formattedPrice = `€${camper.price.toFixed(2)}`;
  const formattedLocation = camper.location.split(', ').reverse().join(', ');

  const tabs = [
    {
      id: 'features',
      label: 'Features',
      content: <Features camper={camper} />,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: <Reviews reviews={camper.reviews} />,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.name}>{camper.name}</h1>
          <div className={styles.meta}>
            <div className={styles.rating}>
              <StarIcon />
              <span className={styles.ratingText}>
                {camper.rating}({camper.reviews.length} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <LocationIcon />
              <span>{formattedLocation}</span>
            </div>
          </div>
          <p className={styles.price}>{formattedPrice}</p>
        </header>

        {/* Gallery */}
        <div className={styles.gallery}>
          {camper.gallery.slice(0, 4).map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image.original}
                alt={`${camper.name} - Photo ${index + 1}`}
                fill
                sizes="(max-width: 1440px) 25vw, 292px"
                className={styles.image}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <p className={styles.description}>{camper.description}</p>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.tabsWrapper}>
            <Tabs tabs={tabs} defaultTab="features" />
          </div>

          <aside className={styles.sidebar}>
            <BookingForm camperName={camper.name} />
          </aside>
        </div>
      </div>
    </div>
  );
}
