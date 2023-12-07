import axiosInstance from "../../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITaskTypes } from "./task.types";

const initialState: ITaskTypes = {
  title: "",
  description: "",
  _id: "",
  tasks: [],
  // taskDeleteMessage: "",
  completed: false,
  isErrored: false,
  error: "",
  isInProgress: false,
  message: "",
};

// create task
export const createTask = createAsyncThunk(
  "task/createTask",
  async (task: ITaskTypes, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/task/create-task", task);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get all task
export const getAllTask = createAsyncThunk(
  "task/getAllTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/task/tasks");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

//  get single task
export const getTask = createAsyncThunk(
  "task/getTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get(`/task/task/${id}`);
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update task
export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().put(`/task/update-task/${id}`);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete task
export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().delete(`/task/delete-task/${id}`);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    errorCleanUp: (state) => {
      state.isErrored = false;
      state.error = "";
    },
    successCleanUp: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(createTask.fulfilled, (state, action: any) => {
      state.isInProgress = false;
      state.message = action.payload.message;
    });
    builder.addCase(createTask.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });

    builder.addCase(getAllTask.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(getAllTask.fulfilled, (state, action: any) => {
      state.isInProgress = false;
      state.message = action.payload.message;
      state.tasks = action.payload.tasks;
    });
    builder.addCase(getAllTask.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });

    builder.addCase(getTask.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(getTask.fulfilled, (state, action: any) => {
      state.isInProgress = false;
      state.message = action.payload.message;
    });
    builder.addCase(getTask.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });

    builder.addCase(updateTask.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action: any) => {
      state.isInProgress = false;
      state.message = action.payload.message;
    });
    builder.addCase(updateTask.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action: any) => {
      state.isInProgress = false;
      state.message = action.payload.message;
    });
    builder.addCase(deleteTask.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });
  },
});

export const { errorCleanUp, successCleanUp } = taskSlice.actions;

export default taskSlice.reducer;
