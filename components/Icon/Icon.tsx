import styles from './Icon.module.css';

export type IconName =
  | 'automatic'
  | 'ac'
  | 'petrol'
  | 'diesel'
  | 'hybrid'
  | 'kitchen'
  | 'radio'
  | 'bathroom'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water'
  | 'tv'
  | 'van'
  | 'fullyIntegrated'
  | 'alcove'
  | 'heart'
  | 'heart-filled'
  | 'star'
  | 'star-filled'
  | 'location';

interface IconProps {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

const Icon = ({ 
  name, 
  size = 20, 
  width,
  height,
  className = '', 
  color 
}: IconProps) => {
  const iconWidth = width || size;
  const iconHeight = height || size;

  return (
    <svg
      className={`${styles.icon} ${className}`}
      width={iconWidth}
      height={iconHeight}
      style={color ? { color } : undefined}
    >
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
};

export default Icon;
