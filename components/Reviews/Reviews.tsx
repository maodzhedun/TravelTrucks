import { Review } from "@/types/camper";
import Icon from "@/components/Icon/Icon";
import styles from "./Reviews.module.css";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (!reviews || reviews.length === 0) {
    return <p className={styles.empty}>No reviews yet.</p>;
  }

  return (
    <div className={styles.reviews}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.header}>
            <div className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.info}>
              <h4 className={styles.name}>{review.reviewer_name}</h4>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="star-filled"
                    size={16}
                    color={
                      star <= review.reviewer_rating ? "#FFC531" : "#F2F4F7"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.comment}>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
