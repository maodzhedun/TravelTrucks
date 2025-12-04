// store/useCampersStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Camper, Filters } from "@/types/camper";
import { getCampers } from "@/lib/api";

interface CampersState {
  campers: Camper[];
  total: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  filters: Filters;
  favorites: string[];

  // Actions
  setCampers: (campers: Camper[]) => void;
  setTotal: (total: number) => void;
  fetchCampers: (resetResults?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  setFilters: (filters: Filters) => void;
  resetFilters: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const ITEMS_PER_PAGE = 4;

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      total: 0,
      page: 1,
      isLoading: false,
      error: null,
      filters: {},
      favorites: [],

      // Встановити кемпери (для ініціалізації з сервера)
      setCampers: (campers) => set({ campers, page: 1 }),
      setTotal: (total) => set({ total }),

      fetchCampers: async (resetResults = true) => {
        const { filters } = get();

        if (resetResults) {
          set({ campers: [], page: 1 });
        }

        set({ isLoading: true, error: null });

        try {
          const response = await getCampers(filters, 1, ITEMS_PER_PAGE);
          set({
            campers: response.items,
            total: response.total,
            page: 1,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: "Failed to fetch campers.",
            isLoading: false,
          });
          console.error("Error fetching campers:", error);
        }
      },

      loadMore: async () => {
        const { filters, page, campers } = get();
        const nextPage = page + 1;

        set({ isLoading: true, error: null });

        try {
          const response = await getCampers(filters, nextPage, ITEMS_PER_PAGE);
          set({
            campers: [...campers, ...response.items],
            page: nextPage,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: "Failed to load more campers.",
            isLoading: false,
          });
        }
      },

      setFilters: (newFilters) => set({ filters: newFilters }),
      resetFilters: () => set({ filters: {} }),

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "travel-trucks-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
