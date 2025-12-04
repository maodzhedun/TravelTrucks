'use client';

import { useState, useCallback } from 'react';
import { Filters as FiltersType } from '@/types/camper';
import { useCampersStore } from '@/store/useCampersStore';
import styles from './Filters.module.css';

// Icons for filters
const icons = {
  location: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#6C717B" strokeWidth="1.5">
      <path d="M10 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M10 17s6-4 6-8.5a6 6 0 1 0-12 0c0 4.5 6 8.5 6 8.5Z" />
    </svg>
  ),
  ac: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="1.8">
      <path d="M16 6v20M10 10c3.5-3.5 8.5-3.5 12 0M10 22c3.5 3.5 8.5 3.5 12 0" />
    </svg>
  ),
  automatic: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="1.8">
      <circle cx="16" cy="16" r="4" />
      <path d="M16 6v3M16 23v3M6 16h3M23 16h3M8.93 8.93l2.12 2.12M20.95 20.95l2.12 2.12M8.93 23.07l2.12-2.12M20.95 11.05l2.12-2.12" />
    </svg>
  ),
  kitchen: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="1.8">
      <path d="M6 6v8a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V6M9 6v20M23 6v3a4 4 0 0 1 4 4v2a2 2 0 0 1-2 2h-2M23 17v9" />
    </svg>
  ),
  tv: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="1.8">
      <rect x="4" y="9" width="24" height="16" rx="2" />
      <path d="M12 4l4 5 4-5" />
    </svg>
  ),
  bathroom: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#101828" strokeWidth="1.8">
      <path d="M6 16h20M6 16V10a3 3 0 0 1 3-3h3M6 16v5a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-5" />
    </svg>
  ),
  van: (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="#101828" strokeWidth="1.8">
      <rect x="1" y="4" width="28" height="18" rx="2" />
      <path d="M29 10h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7" />
      <circle cx="9" cy="22" r="3" />
      <circle cx="33" cy="22" r="3" />
    </svg>
  ),
  fullyIntegrated: (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="#101828" strokeWidth="1.8">
      <path d="M4 22V8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v14" />
      <path d="M4 22h32" />
      <circle cx="10" cy="22" r="3" />
      <circle cx="30" cy="22" r="3" />
      <rect x="10" y="8" width="20" height="8" rx="1" />
    </svg>
  ),
  alcove: (
    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" stroke="#101828" strokeWidth="1.8">
      <rect x="4" y="8" width="24" height="16" rx="2" />
      <path d="M28 12h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6" />
      <path d="M8 8V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      <circle cx="10" cy="24" r="2" />
      <circle cx="32" cy="24" r="2" />
    </svg>
  ),
};

const equipmentFilters = [
  { key: 'AC', label: 'AC', icon: icons.ac },
  { key: 'transmission', label: 'Automatic', icon: icons.automatic, value: 'automatic' },
  { key: 'kitchen', label: 'Kitchen', icon: icons.kitchen },
  { key: 'TV', label: 'TV', icon: icons.tv },
  { key: 'bathroom', label: 'Bathroom', icon: icons.bathroom },
];

const vehicleTypes = [
  { key: 'panelTruck', label: 'Van', icon: icons.van },
  { key: 'fullyIntegrated', label: 'Fully Integrated', icon: icons.fullyIntegrated },
  { key: 'alcove', label: 'Alcove', icon: icons.alcove },
];

const Filters = () => {
  const { filters, setFilters, fetchCampers, isLoading } = useCampersStore();
  const [localFilters, setLocalFilters] = useState<FiltersType>(filters);

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prev) => ({ ...prev, location: e.target.value }));
  }, []);

  const handleEquipmentToggle = useCallback((key: string, value?: string) => {
    setLocalFilters((prev) => {
      if (key === 'transmission') {
        return {
          ...prev,
          transmission: prev.transmission === value ? '' : (value as 'automatic' | 'manual'),
        };
      }
      return {
        ...prev,
        [key]: !prev[key as keyof FiltersType],
      };
    });
  }, []);

  const handleVehicleTypeSelect = useCallback((type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      form: prev.form === type ? '' : (type as FiltersType['form']),
    }));
  }, []);

  const handleSearch = useCallback(() => {
    setFilters(localFilters);
    fetchCampers(true);
  }, [localFilters, setFilters, fetchCampers]);

  return (
    <aside className={styles.sidebar}>
      {/* Location */}
      <div className={styles.section}>
        <label className={styles.label}>Location</label>
        <div className={styles.inputWrapper}>
          <span className={styles.inputIcon}>{icons.location}</span>
          <input
            type="text"
            placeholder="City"
            value={localFilters.location || ''}
            onChange={handleLocationChange}
            className={styles.input}
          />
        </div>
      </div>

      {/* Filters Label */}
      <p className={styles.filtersLabel}>Filters</p>

      {/* Vehicle Equipment */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle equipment</h3>
        <div className={styles.divider} />
        <div className={styles.filterGrid}>
          {equipmentFilters.map((filter) => {
            const isActive =
              filter.key === 'transmission'
                ? localFilters.transmission === filter.value
                : localFilters[filter.key as keyof FiltersType];

            return (
              <button
                key={filter.key}
                className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
                onClick={() => handleEquipmentToggle(filter.key, filter.value)}
                type="button"
              >
                <span className={styles.filterIcon}>{filter.icon}</span>
                <span className={styles.filterText}>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle Type */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Vehicle type</h3>
        <div className={styles.divider} />
        <div className={styles.filterGrid}>
          {vehicleTypes.map((type) => (
            <button
              key={type.key}
              className={`${styles.filterBtn} ${localFilters.form === type.key ? styles.active : ''}`}
              onClick={() => handleVehicleTypeSelect(type.key)}
              type="button"
            >
              <span className={styles.filterIcon}>{type.icon}</span>
              <span className={styles.filterText}>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        className={styles.searchBtn}
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </aside>
  );
};

export default Filters;
