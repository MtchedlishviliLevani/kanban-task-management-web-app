import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";
import { v4 as uuidv4 } from "uuid"; // Import the uuid library

interface Subtask {
  id?: string;
  title: string;
  isCompleted: boolean;
}

interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Column {
  id?: string;
  name: string;
  tasks: Task[];
}

interface Board {
  id?: string;
  name: string;
  columns: Column[];
}

interface Data {
  boards: Board[];
}

interface Initial {
  data: Data;
  activeIndex: number;
}

const addIdsToData = (data: Data) => {
  return data.boards.map((board) => ({
    ...board,
    id: uuidv4(),
    columns: board.columns.map((column) => ({
      ...column,
      id: uuidv4(),
      tasks: column.tasks.map((task) => ({
        ...task,
        id: uuidv4(),
        subtasks: task.subtasks.map((subtask) => ({
          ...subtask,
          id: uuidv4(),
        })),
      })),
    })),
  }));
};

const initialState: Initial = {
  data: { boards: addIdsToData(data) },
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
    dragAndDropFn: (state, action) => {
      const { activeIndex } = state;
      state.data.boards[activeIndex] = action.payload;
    },

    addTaskValues: (state, action) => {
      const { title, description, status, subTasks, id } = action.payload;
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
          id,
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
      const { name, columns, id } = action.payload;
      state.data.boards.push({ name, columns, id });
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
  dragAndDropFn,
} = boardSlice.actions;
export default boardSlice.reducer;
