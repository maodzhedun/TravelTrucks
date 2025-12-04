import { Camper, FORM_TYPES } from '@/types/camper';
import Badge from '@/components/Badge/Badge';
import styles from './Features.module.css';

// Icons
const icons = {
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
    </svg>
  ),
  gas: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M10 2c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" />
    </svg>
  ),
  water: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#101828" strokeWidth="1.5">
      <path d="M10 2c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
    </svg>
  ),
};

interface FeaturesProps {
  camper: Camper;
}

const Features = ({ camper }: FeaturesProps) => {
  // Build features list
  const features: { key: string; label: string; icon: JSX.Element }[] = [];

  if (camper.transmission === 'automatic') {
    features.push({ key: 'automatic', label: 'Automatic', icon: icons.automatic });
  }
  if (camper.AC) features.push({ key: 'ac', label: 'AC', icon: icons.ac });
  if (camper.engine) {
    features.push({ key: 'engine', label: camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1), icon: icons.petrol });
  }
  if (camper.kitchen) features.push({ key: 'kitchen', label: 'Kitchen', icon: icons.kitchen });
  if (camper.TV) features.push({ key: 'tv', label: 'TV', icon: icons.tv });
  if (camper.bathroom) features.push({ key: 'bathroom', label: 'Bathroom', icon: icons.bathroom });
  if (camper.radio) features.push({ key: 'radio', label: 'Radio', icon: icons.radio });
  if (camper.refrigerator) features.push({ key: 'refrigerator', label: 'Refrigerator', icon: icons.refrigerator });
  if (camper.microwave) features.push({ key: 'microwave', label: 'Microwave', icon: icons.microwave });
  if (camper.gas) features.push({ key: 'gas', label: 'Gas', icon: icons.gas });
  if (camper.water) features.push({ key: 'water', label: 'Water', icon: icons.water });

  // Vehicle details
  const details = [
    { label: 'Form', value: FORM_TYPES[camper.form] || camper.form },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <div className={styles.features}>
      <div className={styles.badges}>
        {features.map((feature) => (
          <Badge key={feature.key} icon={feature.icon}>
            {feature.label}
          </Badge>
        ))}
      </div>

      <div className={styles.details}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <div className={styles.divider} />
        <ul className={styles.detailsList}>
          {details.map((detail) => (
            <li key={detail.label} className={styles.detailItem}>
              <span className={styles.detailLabel}>{detail.label}</span>
              <span className={styles.detailValue}>{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Features;
