// import { create } from "zustand";
// import dataJson from "../data.json";
// import { immer } from "zustand/middleware/immer";

// type Data = {
//   data: typeof dataJson;
//   addBoard?: (newBoards: (typeof dataJson)["boards"]) => void;
//   isDarkMode: boolean;
//   modeSwitcher: () => void;
//   isOpenSide: boolean;
//   toggleIsOpenSide: () => void;
//   openSide: () => void;
//   hideSide: () => void;
//   isShownOverlay: boolean;
//   shownOverlay: () => void;
//   activeButton: string;
//   setActiveButton: (board: string) => void;

//   //trying
//   activeButtonIndex: number;
//   setActiveButtonIndex: (index: number) => void;

//   activeBoardName: string;
//   editBoardName: (newName: string) => void;
//   savedBoardName: () => void;

//   inputValues: { name: string }[];
//   inputValuesChanges: (value: string, index: number) => void;
// };
// const useData = create<Data>()(
//   immer((set, get) => ({
//     data: dataJson,
//     addBoard: (newBoards) => {
//       set((state) => {
//         state.data.boards = [...state.data.boards, ...newBoards];
//       });
//     },

//     isDarkMode: false,
//     modeSwitcher: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
//     isOpenSide: true,
//     openSide: () => set(() => ({ isOpenSide: true })),
//     hideSide: () => set(() => ({ isOpenSide: false })),
//     toggleIsOpenSide: () => set((state) => ({ isOpenSide: !state.isOpenSide })),
//     isShownOverlay: false,
//     shownOverlay: () =>
//       set((state) => ({ isShownOverlay: !state.isShownOverlay })),
//     // active button for side component
//     activeButton: "Platform Launch",
//     setActiveButton: (board) => set({ activeButton: board }),

//     //trysing
//     activeButtonIndex: 0,
//     setActiveButtonIndex: (index) => set({ activeButtonIndex: index }),
//     inputValues: dataJson.boards[0].columns,
//     inputValuesChanges: (value, index) => {
//       set((state) => {
//         return {
//           ...state,
//           inputValues: state.inputValues.map((item, i) => {
//             if (i === index) {
//               return { ...item, name: value };
//             }
//             return item;
//           }),
//         };
//       });
//     },

//     // old code

//     activeBoardName: dataJson.boards[0].name,
//     editBoardName: (newName) => set({ activeBoardName: newName }),
//     savedBoardName: () => {
//       set((state) => {
//         const activeBoardName = get().activeBoardName;
//         const activeIndex = get().activeButtonIndex;

//         // Update the name of the active board
//         const updatedBoards = state.data.boards.map((board, index) => {
//           if (index === activeIndex) {
//             return { ...board, name: activeBoardName };
//           }
//           return board;
//         });

//         // Return the updated state
//         return {
//           ...state,
//           data: {
//             ...state.data,
//             boards: updatedBoards,
//           },
//         };
//       });
//     },
//   }))
// );

// export default useData;
