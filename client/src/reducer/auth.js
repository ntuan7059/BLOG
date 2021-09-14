import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
	loading: true,
	isAuthenticated: null,
};

const auth = createSlice({
	name: "auth",
	initialState,
	extraReducers: {
		[register.pending]: (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			state.token = action.payload;
			state.isAuthenticated = true;
			localStorage.setItem("token", action.payload.token);
		},
		[register.rejected]: (state) => {
			state.token = null;
			state.loading = false;
			state.isAuthenticated = false;
			localStorage.removeItem("token");
		},
	},
});

export default auth.reducer;
