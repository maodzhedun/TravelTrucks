import { Camper, FORM_TYPES } from "@/types/camper";
import Badge from "@/components/Badge/Badge";
import Icon, { IconName } from "@/components/Icon/Icon";
import styles from "./Features.module.css";

interface FeaturesProps {
  camper: Camper;
}

const Features = ({ camper }: FeaturesProps) => {
  // Build features list
  const features: { key: string; label: string; icon: IconName }[] = [];

  if (camper.transmission === "automatic") {
    features.push({ key: "automatic", label: "Automatic", icon: "automatic" });
  }
  if (camper.AC) features.push({ key: "ac", label: "AC", icon: "ac" });
  if (camper.engine) {
    const engineLabel =
      camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1);
    const engineIcon: IconName =
      camper.engine === "diesel"
        ? "diesel"
        : camper.engine === "hybrid"
          ? "hybrid"
          : "petrol";
    features.push({ key: "engine", label: engineLabel, icon: engineIcon });
  }
  if (camper.TV) features.push({ key: "tv", label: "TV", icon: "tv" });
  if (camper.bathroom)
    features.push({ key: "bathroom", label: "Bathroom", icon: "bathroom" });
  if (camper.kitchen)
    features.push({ key: "kitchen", label: "Kitchen", icon: "kitchen" });
  if (camper.radio)
    features.push({ key: "radio", label: "Radio", icon: "radio" });
  if (camper.refrigerator)
    features.push({
      key: "refrigerator",
      label: "Refrigerator",
      icon: "refrigerator",
    });
  if (camper.microwave)
    features.push({ key: "microwave", label: "Microwave", icon: "microwave" });
  if (camper.gas) features.push({ key: "gas", label: "Gas", icon: "gas" });
  if (camper.water)
    features.push({ key: "water", label: "Water", icon: "water" });

  // Vehicle details
  const details = [
    { label: "Form", value: FORM_TYPES[camper.form] || camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div className={styles.features}>
      <div className={styles.badges}>
        {features.map((feature) => (
          <Badge
            key={feature.key}
            icon={<Icon name={feature.icon} size={20} />}
          >
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
