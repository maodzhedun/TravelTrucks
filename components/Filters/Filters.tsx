"use client";

import { useState } from "react";
import { Filters } from "@/types/camper";
import styles from "./Filters.module.css";

// SVG Icons
const icons = {
  location: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 10.833a2.083 2.083 0 1 0 0-4.166 2.083 2.083 0 0 0 0 4.166Z"
        stroke="#6C717B"
        strokeWidth="1.5"
      />
      <path
        d="M10 17.5s6.25-4.375 6.25-8.75a6.25 6.25 0 1 0-12.5 0c0 4.375 6.25 8.75 6.25 8.75Z"
        stroke="#6C717B"
        strokeWidth="1.5"
      />
    </svg>
  ),
  ac: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 4v24M16 4l4 4M16 4l-4 4M16 28l4-4M16 28l-4-4"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10l17.32 10M6 10l1 5.66M6 10l5.66 1M23.32 20l-1-5.66M23.32 20l-5.66-1"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 22l17.32-10M6 22l5.66-1M6 22l1-5.66M23.32 12l-5.66 1M23.32 12l-1 5.66"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  automatic: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="5.25" stroke="#101828" strokeWidth="1.5" />
      <path
        d="M16 4v3M16 25v3M4 16h3M25 16h3M7.76 7.76l2.12 2.12M22.12 22.12l2.12 2.12M7.76 24.24l2.12-2.12M22.12 9.88l2.12-2.12"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  kitchen: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M10 6v8a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V6M12 6v20M20 6v4a4 4 0 0 0 4 4h0V6"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  tv: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect
        x="4"
        y="8"
        width="24"
        height="16"
        rx="2"
        stroke="#101828"
        strokeWidth="1.5"
      />
      <path
        d="M20 4l-4 4-4-4"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bathroom: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M6 16h20M6 16v-6a4 4 0 0 1 4-4h4M6 16v6a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-6"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  van: (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <path
        d="M32.5 20h3c1.38 0 2.5-1.12 2.5-2.5v-5c0-.95-.53-1.82-1.38-2.24l-6.12-3.06V5.5c0-1.38-1.12-2.5-2.5-2.5H5.5C4.12 3 3 4.12 3 5.5v12c0 1.38 1.12 2.5 2.5 2.5h2"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="11" cy="21" r="3" stroke="#101828" strokeWidth="1.5" />
      <circle cx="29" cy="21" r="3" stroke="#101828" strokeWidth="1.5" />
      <path d="M14 21h12" stroke="#101828" strokeWidth="1.5" />
    </svg>
  ),
  fullyIntegrated: (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <rect
        x="3"
        y="5"
        width="34"
        height="15"
        rx="2"
        stroke="#101828"
        strokeWidth="1.5"
      />
      <circle cx="11" cy="21" r="3" stroke="#101828" strokeWidth="1.5" />
      <circle cx="29" cy="21" r="3" stroke="#101828" strokeWidth="1.5" />
      <path
        d="M14 21h12M28 5v-2h4v2M8 9h6M8 13h4"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  alcove: (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
      <path
        d="M3 20V7a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v3l6 3v5a2 2 0 0 1-2 2h-2"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 20h4M26 20h6"
        stroke="#101828"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 5h20v-2a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2Z"
        stroke="#101828"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="21" r="3" stroke="#101828" strokeWidth="1.5" />
      <circle cx="23" cy="21" r="3" stroke="#101828" strokeWidth="1.5" />
      <path d="M13 21h7" stroke="#101828" strokeWidth="1.5" />
    </svg>
  ),
};

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
          <span className={styles.inputIcon}>{icons.location}</span>
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
            {icons.ac}
            <span>AC</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.transmission ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("transmission")}
          >
            {icons.automatic}
            <span>Automatic</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.kitchen ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("kitchen")}
          >
            {icons.kitchen}
            <span>Kitchen</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.TV ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("TV")}
          >
            {icons.tv}
            <span>TV</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${equipment.bathroom ? styles.active : ""}`}
            onClick={() => handleEquipmentToggle("bathroom")}
          >
            {icons.bathroom}
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
            {icons.van}
            <span>Van</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${form === "fullyIntegrated" ? styles.active : ""}`}
            onClick={() => handleFormToggle("fullyIntegrated")}
          >
            {icons.fullyIntegrated}
            <span>Fully Integrated</span>
          </button>
          <button
            type="button"
            className={`${styles.checkbox} ${form === "alcove" ? styles.active : ""}`}
            onClick={() => handleFormToggle("alcove")}
          >
            {icons.alcove}
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
