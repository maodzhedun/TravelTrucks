"use client";

import Image from "next/image";
import { Camper } from "@/types/camper";
import Tabs from "@/components/Tabs/Tabs";
import Features from "@/components/Features/Features";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./page.module.css";

// Icons
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFC531">
    <path d="M7.053 1.276a1 1 0 0 1 1.894 0l1.294 3.81a1 1 0 0 0 .912.682l4.003.085a1 1 0 0 1 .586 1.797l-3.182 2.455a1 1 0 0 0-.35 1.073l1.138 3.864a1 1 0 0 1-1.532 1.111L8.52 13.93a1 1 0 0 0-1.04 0l-3.296 2.223a1 1 0 0 1-1.532-1.111l1.138-3.864a1 1 0 0 0-.35-1.073L.258 7.65a1 1 0 0 1 .586-1.797l4.003-.085a1 1 0 0 0 .912-.683l1.294-3.81Z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="#101828"
    strokeWidth="1.5"
  >
    <path d="M8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
    <path d="M8 14s5-3.5 5-7a5 5 0 1 0-10 0c0 3.5 5 7 5 7Z" />
  </svg>
);

interface CamperDetailsClientProps {
  camper: Camper;
}

export default function CamperDetailsClient({
  camper,
}: CamperDetailsClientProps) {
  const formattedPrice = `в‚¬${camper.price.toFixed(2)}`;
  const formattedLocation = camper.location.split(", ").reverse().join(", ");

  const tabs = [
    { id: "features", label: "Features" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.name}>{camper.name}</h1>
          <div className={styles.meta}>
            <div className={styles.rating}>
              <StarIcon />
              <span className={styles.ratingText}>
                {camper.rating}({camper.reviews?.length || 0} Reviews)
              </span>
            </div>
            <div className={styles.location}>
              <LocationIcon />
              <span>{formattedLocation}</span>
            </div>
          </div>
          <p className={styles.price}>{formattedPrice}</p>
        </div>

        {/* Gallery */}
        <div className={styles.gallery}>
          {camper.gallery?.slice(0, 4).map((image, index) => (
            <div key={index} className={styles.galleryItem}>
              <Image
                src={image.original}
                alt={`${camper.name} - image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 292px"
                className={styles.galleryImage}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <p className={styles.description}>{camper.description}</p>

        {/* Content - Tabs + Booking Form */}
        <div className={styles.content}>
          <div className={styles.tabsWrapper}>
            <Tabs tabs={tabs} defaultTab="features">
              {(activeTab) => (
                <>
                  {activeTab === "features" && <Features camper={camper} />}
                  {activeTab === "reviews" && (
                    <Reviews reviews={camper.reviews || []} />
                  )}
                </>
              )}
            </Tabs>
          </div>

          <div className={styles.sidebar}>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
