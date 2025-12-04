import { Camper } from "@/types/camper";
import CamperCard from "@/components/CamperCard/CamperCard";
import styles from "./CamperList.module.css";

interface CamperListProps {
  campers: Camper[];
}

const CamperList = ({ campers }: CamperListProps) => {
  return (
    <div className={styles.list}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </div>
  );
};

export default CamperList;
