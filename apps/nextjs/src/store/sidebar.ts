import { create } from "zustand";

interface SidebarStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  open: false,
  setOpen: (val) => set({ open: val }),
}));
