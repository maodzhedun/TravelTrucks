import styles from './Badge.module.css';

interface BadgeProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Badge = ({ icon, children }: BadgeProps) => {
  return (
    <div className={styles.badge}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default Badge;
