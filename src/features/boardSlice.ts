import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Columns {
  name: string; // Define the 'name' property here
  tasks: Task[];
}

interface Initial {
  data: typeof data;
  activeIndex: number;
  isOverlayed: boolean;
  board: typeof data.boards;
  boardName: string;
  boardColumnsName: Columns[];
  isOpenNewColumn: boolean;
}

const initialState: Initial = {
  data,
  activeIndex: 0,
  isOverlayed: false,
  board: data.boards,
  boardName: data.boards[0].name,
  boardColumnsName: data.boards[0].columns,
  isOpenNewColumn: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveIndex: (state, action) => {
      // state.activeIndex = action.payload;
      return { ...state, activeIndex: action.payload };
    },
    toggleOverlay: (state) => {
      // state.isOverlayed = !state.isOverlayed;
      return { ...state, isOverlayed: !state.isOverlayed };
    },
    editBoardName: (state, action) => {
      // state.boardName = action.payload;
      return { ...state, boardName: action.payload };
    },
    setActiveBoardName: (state) => {
      // state.boardName = state.board[state.activeIndex].name;
      return { ...state, boardName: state.board[state.activeIndex].name };
    },
    editColumnName: (state, action) => {
      const { columnIndex, newColumnName } = action.payload;
      //  state.boardColumnsName[columnIndex].name = newColumnName;

      // new
      const updatedBoardColumnsName = state.boardColumnsName.map(
        (column, index) =>
          index === columnIndex
            ? { ...column, name: newColumnName }
            : { ...column }
      );
      return { ...state, boardColumnsName: updatedBoardColumnsName };
    },
    addNewColumnName: (state) => {
      // state.boardColumnsName.push({ name: "", tasks: [] });
      return {
        ...state,
        boardColumnsName: [...state.boardColumnsName, { name: "", tasks: [] }],
      };
    },
    removeColumnName: (state, action) => {
      const { activeIndex } = action.payload;
      const updatedColumnsName = state.boardColumnsName.filter(
        (_, index) => index !== activeIndex
      );
      return {
        ...state,
        boardColumnsName: updatedColumnsName,
      };
    },

    saveBoardName: (state) => {
      state.data.boards[state.activeIndex].name = state.boardName;
    },
    saveColumnName: (state) => {
      state.data.boards[state.activeIndex].columns = state.boardColumnsName;
    },
    setActiveColumnName: (state) => {
      state.boardColumnsName = state.board[state.activeIndex].columns;
    },
    openNewColumn: (state) => {
      return { ...state, isOpenNewColumn: !state.isOpenNewColumn };
    },
    activeTaskForm: (state) => {
      // state.data.boards[state.activeIndex].columns;
      state.boardColumnsName = state.data.boards[state.activeIndex].columns;
    },
    addTaskValues: (state, action) => {
      const { title, description, status, subTasks } = action.payload;
      const columnIndex = state.data.boards[
        state.activeIndex
      ].columns.findIndex((column) => column.name === status);
      state.data.boards[state.activeIndex].columns[columnIndex].tasks.push({
        title,
        description,
        status, // Provide a default value for status
        subtasks: subTasks, // Provide an empty array for subtasks
      });
    },
    // detailedInfo: (state, action) => {
    //   const { status } = action.payload;
    //   const columnIndex = state.data.boards[
    //     state.activeIndex
    //   ].columns.findIndex((column) => column.name === status);
    // },
    checkBox: (state, action) => {
      const { activeColumnName, activeIndex1, checkIndex } = action.payload;
      // const columns  = state.data.boards[state.activeIndex].columns[0].activeColumn
      const foundColumn = state.data.boards[state.activeIndex].columns.filter(
        (value) => value.name == activeColumnName
      )[0]?.tasks[activeIndex1];
      if (foundColumn) {
        foundColumn.subtasks[checkIndex].isCompleted =
          !foundColumn.subtasks[checkIndex].isCompleted;
      }
    },
    changeColumn: (state, action) => {
      const { sourceIndex, activeIndex1, status, activeColumnName } =
        action.payload;
      // Find the destination column
      const destinationColumnIndex = state.data.boards[
        state.activeIndex
      ].columns.findIndex((board) => board.name === status);
      if (activeColumnName !== status) {
        // Find the selected task
        const selectedTask =
          state.data.boards[state.activeIndex]?.columns[sourceIndex]?.tasks[
            activeIndex1
          ];

        // Push the selected task to the destination column
        state.data.boards[state.activeIndex]?.columns[
          destinationColumnIndex
        ]?.tasks.push(selectedTask);

        // Remove the selected task from the source column
        state.data.boards[state.activeIndex]?.columns[
          sourceIndex
        ]?.tasks.splice(activeIndex1, 1);
      }
    },

    addNewBoard: (state, action) => {
      const { name, columns } = action.payload;
      state.data.boards.push({ name, columns });
    },
    boardDelete: (state) => {
      state.data.boards = state.data.boards.filter(
        (_, i) => i !== state.activeIndex
      );
    },
  },
});

export const {
  changeColumn,
  checkBox,
  boardDelete,
  addNewBoard,
  addTaskValues,
  activeTaskForm,
  removeColumnName,
  addNewColumnName,
  setActiveBoardName,
  editBoardName,
  setActiveIndex,
  toggleOverlay,
  editColumnName,
  saveBoardName,
  setActiveColumnName,
  saveColumnName,
  openNewColumn,
} = boardSlice.actions;
export default boardSlice.reducer;
