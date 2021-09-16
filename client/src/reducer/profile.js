import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUser = createAsyncThunk(
	"profile/getCurrentUser",
	async () => {
		const res = await axios.get("http://localhost:5000/api/profile/me");
		return res.data;
	}
);

export const updateProfile = createAsyncThunk(
	"profile/updateProfile",
	async ({
		company,
		website,
		location,
		status,
		skills,
		bio,
		twitter,
		facebook,
		linkein,
		youtube,
		instagram,
	}) => {
		const res = await axios.post("http://localhost:5000/api/profile", {
			company,
			website,
			location,
			status,
			skills,
			bio,
			twitter,
			facebook,
			linkein,
			youtube,
			instagram,
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
		[updateProfile.pending]: (state) => {
			state.loading = true;
		},
		[updateProfile.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[updateProfile.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export default profile.reducer;
