import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const promise = await axios.get("http://localhost:5000/api/auth");
		return console.log(promise.data);
	} catch (error) {
		console.error(error.message);
	}
});

export const register = createAsyncThunk(
	"auth/register",
	async ({ email, name, password }) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.post(
			"http://localhost:5000/api/users",
			{ name, email, password },
			config
		);
		return res.data;
	}
);

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
};

const auth = createSlice({
	name: "auth",
	initialState,
	extraReducers: {
		[register.pending]: (state) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.token = action.payload;
			localStorage.setItem("token", action.payload.token);
		},
		[register.rejected]: (state) => {
			state.token = null;
			state.isAuthenticated = false;
			state.loading = false;
			localStorage.removeItem("token");
		},
		[loadUser.pending]: (state) => {
			state.loading = true;
		},
		[loadUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		[loadUser.rejected]: (state) => {
			state.token = null;
			state.isAuthenticated = false;
			state.loading = false;
			state.user = null;
			localStorage.removeItem("token");
		},
	},
});

export default auth.reducer;
