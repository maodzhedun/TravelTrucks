import { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
}

const Badge = ({ children, icon }: BadgeProps) => {
  return (
    <span className={styles.badge}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{children}</span>
    </span>
  );
};

export default Badge;
