import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { name, email, password } = action.payload;
export const register = createAsyncThunk(
	"auth/register",
	async (name, email, password) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const body = JSON.stringify({
			name,
			email,
			password,
		});

		const res = await axios.post(
			"http://localhost:5000/api/users",
			body,
			config
		);
		return res.data;
	}
);

const initialState = {
	token: "",
	isAuthenticated: null,
	loading: true,
	user: null,
};

const auth = createSlice({
	name: "auth",
	initialState,
	extraReducers: {
		[register.pending]: (state, action) => {
			state.loading = true;
		},
		[register.fulfilled]: (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.token = action.payload;
		},
		[register.rejected]: (state, action) => {
			state.token = null;
			state.isAuthenticated = false;
			state.loading = false;
		},
	},
});

export default auth.reducer;
