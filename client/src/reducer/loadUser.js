import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUser = createAsyncThunk("user/loadUser", async () => {
	const promise = await axios.get("http://localhost:5000/api/auth");
	return promise.data;
});

const initialState = {
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
		},
		[loadUser.rejected]: (state) => {
			state.loading = false;
			state.user = null;
			localStorage.removeItem("token");
		},
	},
});

export default user.reducer;
