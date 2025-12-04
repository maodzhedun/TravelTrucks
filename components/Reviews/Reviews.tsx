import { Review } from '@/types/camper';
import styles from './Reviews.module.css';

// Star icon
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill={filled ? '#FFC531' : '#F2F4F7'}>
    <path d="M7.053 1.276a1 1 0 0 1 1.894 0l1.294 3.81a1 1 0 0 0 .912.682l4.003.085a1 1 0 0 1 .586 1.797l-3.182 2.455a1 1 0 0 0-.35 1.073l1.138 3.864a1 1 0 0 1-1.532 1.111L8.52 13.93a1 1 0 0 0-1.04 0l-3.296 2.223a1 1 0 0 1-1.532-1.111l1.138-3.864a1 1 0 0 0-.35-1.073L.258 7.65a1 1 0 0 1 .586-1.797l4.003-.085a1 1 0 0 0 .912-.683l1.294-3.81Z" />
  </svg>
);

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (reviews.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No reviews yet. Be the first to review this camper!</p>
      </div>
    );
  }

  return (
    <div className={styles.reviews}>
      {reviews.map((review, index) => (
        <article key={index} className={styles.review}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.info}>
              <h4 className={styles.name}>{review.reviewer_name}</h4>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= review.reviewer_rating} />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default Reviews;
