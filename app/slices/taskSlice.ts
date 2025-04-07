import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../models/tasks';

interface TasksState {
  tasks: Task[];
  inProgressCount: number;
}

const initialState: TasksState = {
  tasks: [],
  inProgressCount: 0,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.inProgressCount = action.payload.filter(task => task.status === 'in progress').length;
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      if (action.payload.status === 'in progress') {
        state.inProgressCount++;
      }
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (!task) return;

      if (task.status === 'in progress') {
        state.inProgressCount--;
      }

      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },

    markTaskCompleted: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task && task.status !== 'completed') {
        if (task.status === 'in progress') {
          state.inProgressCount--;
        }
        task.status = 'completed';
      }
    },

    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (!task) return;

      if (task.status === 'in progress') {
        task.status = 'completed';
        state.inProgressCount--;
      } else if (task.status === 'completed') {
        task.status = 'in progress';
        state.inProgressCount++;
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  markTaskCompleted,
  toggleTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
