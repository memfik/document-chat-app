import { create } from "zustand";
import { ACC_DATA } from "@/app/(main)/accompaniment/data/accompaniment";
import type { AccompanimentRow } from "@/app/(main)/accompaniment/data/accompaniment";

interface AccompanimentState {
  rows: AccompanimentRow[];
  total: number;
  page: number;
  rowsPerPage: number;
  search: string;
  currentYearOnly: boolean;
  loading: boolean;
  error: string | null;

  setPage: (p: number) => void;
  setRowsPerPage: (rpp: number) => void;
  setSearch: (s: string) => void;
  toggleCurrentYear: () => void;
  // TODO: replace mock with real API call when endpoints are ready
  fetch: () => Promise<void>;
}

export const useAccompanimentStore = create<AccompanimentState>()((set) => ({
  rows: ACC_DATA,
  total: ACC_DATA.length,
  page: 0,
  rowsPerPage: 25,
  search: "",
  currentYearOnly: false,
  loading: false,
  error: null,

  setPage: (p) => set({ page: p }),
  setRowsPerPage: (rpp) => set({ rowsPerPage: rpp, page: 0 }),
  setSearch: (s) => set({ search: s, page: 0 }),
  toggleCurrentYear: () => set((state) => ({ currentYearOnly: !state.currentYearOnly, page: 0 })),

  fetch: async () => {
    // TODO: replace with real API call
    // const { page, rowsPerPage, search, currentYearOnly } = get();
    // set({ loading: true, error: null });
    // try {
    //   const res = await accompanimentApi.list({ page, pageSize: rowsPerPage, search, currentYearOnly });
    //   set({ rows: res.data, total: res.total });
    // } catch (e: any) {
    //   set({ error: e.message });
    // } finally {
    //   set({ loading: false });
    // }
  },
}));
