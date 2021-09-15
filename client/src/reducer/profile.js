import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUser = createAsyncThunk(
	"profile/getCurrentUser",
	async () => {
		const res = await axios.get("http://localhost:5000/api/profile/me", {
			headers: {
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MWI4ZDMzNjBkOTkwOGYwYWQxMGVhIn0sImlhdCI6MTYzMTY5NzEwOH0.LwZjK9aBtuE2ru6ah_PwdvFaikfqv2TZvU8pHp0lsWA",
			},
		});
		return res.data;
	}
);

const initialState = {
	profile: [],
	profiles: [],
	loading: false,
};

const profile = createSlice({
	name: "profile",
	initialState,
	extraReducers: {
		[getCurrentUser.pending]: (state) => {
			state.loading = true;
		},
		[getCurrentUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[getCurrentUser.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export default profile.reducer;
