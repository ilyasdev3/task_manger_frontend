import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserTypes } from "./user.types";
import axiosInstance from "../../config/axios";

// Define the initial state using that type
const initialState: IUserTypes = {
  user: "",
  error: "",
  isInProgress: false,
  message: "",
};

// get user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/user/user");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    errorCleanUp: (state) => {
      state.error = "";
    },
    successCleanUp: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.error = action.payload.error;
    });
  },
});

export const { errorCleanUp, successCleanUp } = userSlice.actions;

export default userSlice.reducer;
