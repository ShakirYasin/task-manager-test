import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const TaskStatusEnum = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const

export type TaskStatus = typeof TaskStatusEnum[keyof typeof TaskStatusEnum];

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TasksState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Omit<Task, 'id' | 'createdAt'>) => {
  const response = await axios.post(`${API_BASE_URL}/tasks`, task);
  return response.data;
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, status }: { id: number; status: TaskStatus }) => {
    const response = await axios.patch(`${API_BASE_URL}/tasks/${id}`, { status });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: number) => {
    await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
