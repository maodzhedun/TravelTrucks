"use client";

import Image from "next/image";
import { Camper } from "@/types/camper";
import Tabs from "@/components/Tabs/Tabs";
import Features from "@/components/Features/Features";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import Icon from "@/components/Icon/Icon";
import styles from "./page.module.css";

interface CamperDetailsClientProps {
  camper: Camper;
}

export default function CamperDetailsClient({
  camper,
}: CamperDetailsClientProps) {
  const formattedPrice = `\u20AC${camper.price.toFixed(2)}`;
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
                priority={index === 0}
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
