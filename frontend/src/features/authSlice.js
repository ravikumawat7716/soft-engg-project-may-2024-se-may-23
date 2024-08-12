import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ApiUrl } from "../config";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  currentUser: currentUser ? currentUser : null,
  isSuccess: false,
  isLoading: false,
  message: "",
  isError: false,
  token: null,
};

export const googleSignIN = createAsyncThunk(
  "/auth/googlesignin",
  async (user, thunkApi) => {
    try {
      const res = await axios({
        url: `${ApiUrl}/login`,
        method: "POST",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      }

      return res.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  console.log("Loggin Out.....");
  localStorage.removeItem("persist:root");
  localStorage.clear();
});

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    reset: (state) => {
      (state.isError = false),
        (state.isLoading = false),
        (state.isSuccess = false),
        (state.message = ""),
        (state.currentUser = null);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.currentUser = null;
    });
    builder.addCase(googleSignIN.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(googleSignIN.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.message = action.payload),
        (state.currentUser = null);
    });
    builder.addCase(googleSignIN.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.currentUser = action.payload);
      state.token = action.payload.token;
    });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
