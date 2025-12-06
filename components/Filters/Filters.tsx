"use client";

import { useState } from "react";
import { Filters } from "@/types/camper";
import Icon from "@/components/Icon/Icon";
import styles from "./Filters.module.css";

interface FiltersProps {
  onSearch: (filters: Filters) => void;
}

const FiltersComponent = ({ onSearch }: FiltersProps) => {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState<Filters["form"]>(undefined);
  const [equipment, setEquipment] = useState({
    AC: false,
    transmission: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  });

  const handleEquipmentToggle = (key: keyof typeof equipment) => {
    setEquipment((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFormToggle = (value: Filters["form"]) => {
    setForm(form === value ? undefined : value);
  };

  const handleSearch = () => {
    const filters: Filters = {};

    if (location.trim()) filters.location = location.trim();
    if (form) filters.form = form;
    if (equipment.AC) filters.AC = true;
    if (equipment.transmission) filters.transmission = "automatic";
    if (equipment.kitchen) filters.kitchen = true;
    if (equipment.TV) filters.TV = true;
    if (equipment.bathroom) filters.bathroom = true;

    onSearch(filters);
  };

  return (
    <aside className={styles.filters}>
      {/* Location */}
      <div className={styles.section}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>
            <Icon name="location" size={20} color="#6C717B" />
          </span>
          <input
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <p className={styles.filtersLabel}>Filters</p>

      {/* Vehicle Equipment */}
      <div className={styles.section}>
        <h3 className={styles.title}>Vehicle equipment</h3>
        <div className={styles.divider} />
        <div className={styles.checkboxGrid}>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.AC ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("AC")}
          >
            <Icon name="ac" size={32} />
            <span>AC</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.transmission ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("transmission")}
          >
            <Icon name="automatic" size={32} />
            <span>Automatic</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.kitchen ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("kitchen")}
          >
            <Icon name="kitchen" size={32} />
            <span>Kitchen</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.TV ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("TV")}
          >
            <Icon name="tv" size={32} />
            <span>TV</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.bathroom ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("bathroom")}
          >
            <Icon name="bathroom" size={32} />
            <span>Bathroom</span>
          </button>
        </div>
      </div>

      {/* Vehicle Type */}
      <div className={styles.section}>
        <h3 className={styles.title}>Vehicle type</h3>
        <div className={styles.divider} />
        <div className={styles.checkboxGrid}>
          <button
            type="button"
            className={`${styles.checkbox} ${form === "panelTruck" ? styles.active : ""}`}
            onClick={() => handleFormToggle("panelTruck")}
          >
            <Icon name="van" width={40} height={28} />
            <span>Van</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${form === "fullyIntegrated" ? styles.active : ""}`}
            onClick={() => handleFormToggle("fullyIntegrated")}
          >
            <Icon name="fullyIntegrated" width={40} height={28} />
            <span>Fully Integrated</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${form === "alcove" ? styles.active : ""}`}
            onClick={() => handleFormToggle("alcove")}
          >
            <Icon name="alcove" width={40} height={28} />
            <span>Alcove</span>
          </button>
        </div>
      </div>

      {/* Search Button */}
      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
};

export default FiltersComponent;
