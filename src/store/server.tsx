import { create } from "zustand";

interface Item {
  id: number;
  title: string;
  author: string;
  genre: string;
}

interface ItemStore {
  movies: Item | null;
  selectItem: (item: Item) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  movies: null,
  selectItem: (item) => set({ movies: item }),
}));
