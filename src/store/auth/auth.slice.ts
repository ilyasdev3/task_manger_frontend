import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserTypes } from "./auth.types";
import axiosInstance from "../../config/axios";

// Define the initial state using that type
const initialState: IUserTypes = {
  username: "",
  email: "",
  password: "",
  error: "",
  isInProgress: false,
  isValidToken: false,
  message: "",
};

// create user
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (user: IUserTypes, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/auth/register", user);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: IUserTypes, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/auth/login", user);
      localStorage.setItem("taskManagerToken", response.data.token);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// verifytoken
export const verifyToken = createAsyncThunk(
  "auth/verifytpken",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/auth/verifytoken");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    errorCleanUp: (state) => {
      state.error = "";
    },
    messageCleanUp: (state) => {
      state.message = "";
    },
    stateCleanUp: (state) => {
      state.error = "";
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.message = action.payload.message;
    });
    builder.addCase(createUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.error = action.payload.message;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.error = action.payload.message;
    });

    builder.addCase(verifyToken.pending, (state) => {
      state.isInProgress = true;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isValidToken = action.payload.isValidToken;
    });
    builder.addCase(verifyToken.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.error = action.payload.message;
    });
  },
});

export const { errorCleanUp, messageCleanUp, stateCleanUp, tokenCleanUp } =
  userSlice.actions;

export default userSlice.reducer;
