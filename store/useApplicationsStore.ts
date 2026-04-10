import { create } from "zustand";
import { APPLICATIONS, STATUS_FILTERS } from "@/app/(main)/applications/data/applications";
import type { ApplicationRow, StatusFilter } from "@/app/types/application";

interface ApplicationsState {
  rows: ApplicationRow[];
  statusFilters: StatusFilter[];
  total: number;
  page: number;
  rowsPerPage: number;
  search: string;
  activeStatus: string;
  currentYearOnly: boolean;
  loading: boolean;
  error: string | null;

  setPage: (p: number) => void;
  setRowsPerPage: (rpp: number) => void;
  setSearch: (s: string) => void;
  setActiveStatus: (s: string) => void;
  toggleCurrentYear: () => void;
  // TODO: replace mock with real API call when endpoints are ready
  fetch: () => Promise<void>;
}

export const useApplicationsStore = create<ApplicationsState>()((set) => ({
  rows: APPLICATIONS,
  statusFilters: STATUS_FILTERS,
  total: APPLICATIONS.length,
  page: 0,
  rowsPerPage: 25,
  search: "",
  activeStatus: "all",
  currentYearOnly: false,
  loading: false,
  error: null,

  setPage: (p) => set({ page: p }),
  setRowsPerPage: (rpp) => set({ rowsPerPage: rpp, page: 0 }),
  setSearch: (s) => set({ search: s, page: 0 }),
  setActiveStatus: (s) => set({ activeStatus: s, page: 0 }),
  toggleCurrentYear: () => set((state) => ({ currentYearOnly: !state.currentYearOnly, page: 0 })),

  fetch: async () => {
    // TODO: replace with real API call
    // const { page, rowsPerPage, search, activeStatus, currentYearOnly } = get();
    // set({ loading: true, error: null });
    // try {
    //   const res = await applicationsApi.list({ page, pageSize: rowsPerPage, search, status: activeStatus, currentYearOnly });
    //   set({ rows: res.data, total: res.total });
    // } catch (e: any) {
    //   set({ error: e.message });
    // } finally {
    //   set({ loading: false });
    // }
  },
}));
