import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
	const promise = await axios.get("http://localhost:5000/api/auth");
	return promise.data;
});

const initialState = {
	isAuthenticated: null,
	loading: true,
	user: "",
};

const user = createSlice({
	name: "user",
	initialState,
	extraReducers: {
		[loadUser.pending]: (state) => {
			state.loading = true;
		},
		[loadUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		[loadUser.rejected]: (state) => {
			state.loading = false;
			state.user = null;
			state.isAuthenticated = false;
			localStorage.removeItem("token");
		},
	},
});

export default user.reducer;
