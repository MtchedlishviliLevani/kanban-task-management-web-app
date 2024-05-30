import { createSlice } from "@reduxjs/toolkit";

interface Initial {
  isOverlayed: boolean;
  isOpenNewColumn: boolean;
  isOpenAddNewBoard: boolean;
  isOpenNewTaskForm: boolean;
  isOpenDeleteBoard: boolean;
  isOpenBoardAction: boolean;
  isOpenTaskDetailInfo: boolean;
  isOpenTaskAction: boolean;
  isOpenEditTask: boolean;
  isOpenDeleteTask: boolean;
}

const initialState: Initial = {
  isOverlayed: false,
  isOpenNewColumn: false,
  isOpenAddNewBoard: false,
  isOpenNewTaskForm: false,
  isOpenDeleteBoard: false,
  isOpenBoardAction: false,
  isOpenTaskDetailInfo: false,
  isOpenTaskAction: false,
  isOpenEditTask: false,
  isOpenDeleteTask: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleAddNewBoard: (state) => {
      return {
        ...state,
        isOpenAddNewBoard: !state.isOpenAddNewBoard,
      };
    },
    toggleNewColumn: (state) => {
      return { ...state, isOpenNewColumn: !state.isOpenNewColumn };
    },
    toggleNewTaskForm: (state) => {
      return {
        ...state,
        isOpenNewTaskForm: !state.isOpenNewTaskForm,
      };
    },
    toggleOverlay: (state) => {
      return { ...state, isOverlayed: !state.isOverlayed };
    },
    toggleDeleteBoardModal: (state) => {
      return {
        ...state,
        isOpenDeleteBoard: !state.isOpenDeleteBoard,
      };
    },
    toggleBoardActions: (state) => {
      return {
        ...state,
        isOpenBoardAction: !state.isOpenBoardAction,
      };
    },
    toggleTaskDetailInfo: (state) => {
      return {
        ...state,
        isOpenTaskDetailInfo: !state.isOpenTaskDetailInfo,
      };
    },
    hideOverlay: (state) => {
      return {
        ...state,
        isOverlayed: false,
      };
    },
    openOverlay: (state) => {
      return {
        ...state,
        isOverlayed: true,
      };
    },
    toggleTaskAction: (state) => {
      return {
        ...state,
        isOpenTaskAction: !state.isOpenTaskAction,
      };
    },
    toggleEditTask: (state) => {
      return {
        ...state,
        isOpenEditTask: !state.isOpenEditTask,
      };
    },
    toggleDeleteTask: (state) => {
      return {
        ...state,
        isOpenDeleteTask: !state.isOpenDeleteTask,
      };
    },
  },
});

export const {
  toggleNewColumn,
  hideOverlay,
  toggleEditTask,
  toggleTaskAction,
  toggleTaskDetailInfo,
  toggleBoardActions,
  toggleDeleteBoardModal,
  toggleNewTaskForm,
  toggleAddNewBoard,
  openOverlay,
  toggleOverlay,
  toggleDeleteTask,
} = modalSlice.actions;

export default modalSlice.reducer;
