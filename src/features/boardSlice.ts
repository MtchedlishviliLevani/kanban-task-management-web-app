import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

interface Initial {
  data: typeof data;
  activeIndex: number;
}

const initialState: Initial = {
  data,
  activeIndex: 0,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setActiveIndex: (state, action) => {
      return { ...state, activeIndex: action.payload };
    },

    removeTask: (state, action) => {
      const { activeColumnName, activeTaskIndex } = action.payload;
      const board = state.data.boards[state.activeIndex];
      const columnIndex = board.columns.findIndex(
        (column) => column.name === activeColumnName
      );

      if (columnIndex !== -1) {
        const column = board.columns[columnIndex];
        column.tasks = column.tasks.filter(
          (_, index) => index !== activeTaskIndex
        );
      }
    },
    saveColumnName: (state, action) => {
      const { newColumns } = action.payload;
      state.data.boards[state.activeIndex].columns = newColumns;
    },

    addTaskValues: (state, action) => {
      const { title, description, status, subTasks } = action.payload;
      const columnIndex = state.data.boards[
        state.activeIndex
      ].columns.findIndex((column) => column.name === status);
      if (columnIndex !== -1) {
        const tasks =
          state.data.boards[state.activeIndex].columns[columnIndex].tasks;

        // Remove the initial empty object if it exists
        if (tasks.length === 1 && Object.keys(tasks[0]).length === 0) {
          tasks.pop();
        }

        tasks.push({
          title,
          description,
          status: status || "default status",
          subtasks: subTasks.length ? subTasks : [],
        });
      }
    },
    editTaskValues: (state, action) => {
      const {
        title,
        description,
        status,
        subTasks,
        activeColumnName,
        activeTaskIndex,
      } = action.payload;
      const board = state.data.boards[state.activeIndex].columns;

      const foundColumn = board.filter(
        (value) => value?.name == activeColumnName
      )[0]?.tasks[activeTaskIndex];
      if (foundColumn) {
        (foundColumn.title = title),
          (foundColumn.description = description),
          (foundColumn.status = status),
          (foundColumn.subtasks = subTasks);
      }
    },
    checkBox: (state, action) => {
      const { activeColumnName, activeTaskIndex, checkIndex } = action.payload;
      const foundColumn = state.data.boards[state.activeIndex].columns.filter(
        (value) => value.name == activeColumnName
      )[0]?.tasks[activeTaskIndex];
      if (foundColumn) {
        foundColumn.subtasks[checkIndex].isCompleted =
          !foundColumn.subtasks[checkIndex].isCompleted;
      }
    },
    moveTask: (state, action) => {
      const { sourceIndex, activeTaskIndex, status, activeColumnName } =
        action.payload;
      const board = state.data.boards[state.activeIndex].columns;

      // Find the destination column
      const destinationColumnIndex = board.findIndex(
        (column) => column.name === status
      );
      if (activeColumnName !== status) {
        // Find the selected task
        const selectedTask = board[sourceIndex]?.tasks[activeTaskIndex];

        if (selectedTask) {
          board[destinationColumnIndex]?.tasks.push(selectedTask);
          board[sourceIndex]?.tasks.splice(activeTaskIndex, 1);
        }
      }
    },
    editBoardName: (state, action) => {
      const { boardName } = action.payload;
      state.data.boards[state.activeIndex].name = boardName;
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
  editBoardName,
  removeTask,
  moveTask,
  editTaskValues,
  checkBox,
  boardDelete,
  addNewBoard,
  addTaskValues,
  setActiveIndex,
  saveColumnName,
} = boardSlice.actions;
export default boardSlice.reducer;
