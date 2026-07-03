import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";

const tokenFromStorage = localStorage.getItem("token") || null;

export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
	try {
		const data = await authService.login(credentials);
		return data;
	} catch (error) {
		const message = error.response?.data?.message || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const getMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token || localStorage.getItem("token");
		if (!token) return thunkAPI.rejectWithValue("No token");
		const data = await authService.me(token);
		return data;
	} catch (error) {
		const message = error.response?.data?.message || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	user: null,
	token: tokenFromStorage,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
			localStorage.removeItem("token");
			delete axios.defaults.headers.common["Authorization"];
		},
		resetState: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.message = "";
				state.token = action.payload.token;
				state.user = action.payload.user || null;
				if (action.payload.token) {
					localStorage.setItem("token", action.payload.token);
					axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`;
				}
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.isSuccess = false;
				state.message = action.payload || action.error.message;
			})
			.addCase(getMe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isError = false;
				state.user = action.payload;
			})
			.addCase(getMe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload || action.error.message;
			});
	},
});

export const { logout, resetState } = authSlice.actions;
export default authSlice.reducer;
