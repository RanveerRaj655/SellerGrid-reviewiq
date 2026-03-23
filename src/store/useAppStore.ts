import { create } from 'zustand';
import { FilterState, Review } from '@/types';

interface AppStore {
  filters: FilterState;
  selectedReview: Review | null;
  replyDrawerOpen: boolean;
  sidebarCollapsed: boolean;

  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  setSelectedReview: (review: Review | null) => void;
  openReplyDrawer: (review: Review) => void;
  closeReplyDrawer: () => void;
  toggleSidebar: () => void;
}

const defaultFilters: FilterState = {
  platform: 'all',
  sentiment: 'all',
  productId: 'all',
  rootCause: 'all',
  search: '',
};

export const useAppStore = create<AppStore>((set) => ({
  filters: defaultFilters,
  selectedReview: null,
  replyDrawerOpen: false,
  sidebarCollapsed: false,

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  resetFilters: () => set({ filters: defaultFilters }),

  setSelectedReview: (review) => set({ selectedReview: review }),

  openReplyDrawer: (review) =>
    set({ selectedReview: review, replyDrawerOpen: true }),

  closeReplyDrawer: () =>
    set({ replyDrawerOpen: false, selectedReview: null }),

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));