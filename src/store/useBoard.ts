import { create } from "zustand";
import dataJson from "../data.json";
import { immer } from "zustand/middleware/immer";

type Data = {
  data: typeof dataJson;
  addBoard: (newBoards: (typeof dataJson)["boards"]) => void;
  isDarkMode: boolean;
  modeSwitcher: () => void;
  isOpenSide: boolean;
  toggleIsOpenSide: () => void;
  openSide: () => void;
  hideSide: () => void;
  isShownOverlay: boolean;
  shownOverlay: () => void;
};

const useData = create<Data>()(
  immer((set) => ({
    data: dataJson,
    addBoard: (newBoards) => {
      set((state) => {
        state.data.boards = [...state.data.boards, ...newBoards];
      });
    },
    isDarkMode: false,
    modeSwitcher: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    isOpenSide: true,
    openSide: () => set(() => ({ isOpenSide: true })),
    hideSide: () => set(() => ({ isOpenSide: false })),
    toggleIsOpenSide: () => set((state) => ({ isOpenSide: !state.isOpenSide })),
    isShownOverlay: false,
    shownOverlay: () =>
      set((state) => ({ isShownOverlay: !state.isShownOverlay })),
  }))
);

export default useData;
