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

export const addEdu = createAsyncThunk("profile/addEdu", async (edu) => {
	try {
	} catch (error) {}
	const res = await axios
		.put(
			"http://localhost:5000/api/profile/education",

			edu,

			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		.catch((err) => {
			console.log(err);
			throw err;
		});
	return res.data;
});

export const addExp = createAsyncThunk("profile/addExp", async (exp) => {
	const res = await axios.put(
		"http://localhost:5000/api/profile/experience",
		exp,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
});

export const deleteEdu = createAsyncThunk("profile/deleteEdu", async (id) => {
	const res = await axios.delete(
		`http://localhost:5000/api/profile/education/:${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
});

export const deleteExp = createAsyncThunk("profile/deleteExp", async (id) => {
	const res = await axios.delete(
		`http://localhost:5000/api/profile/experience/:${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	return res.data;
});

export const deleteUser = createAsyncThunk("profile/deleteUser", async () => {
	if (window.confirm("Bạn có chắc muốn xóa vĩnh viễn tài khoản?")) {
		const res = await axios.delete(`http://localhost:5000/api/profile`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		return res.data;
	}
});

const initialState = {
	profile: null,
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
		[addEdu.pending]: (state) => {
			state.loading = true;
		},
		[addEdu.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[addEdu.rejected]: (state) => {
			state.loading = false;
		},
		[addExp.pending]: (state) => {
			state.loading = true;
		},
		[addExp.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[addExp.rejected]: (state) => {
			state.loading = false;
		},
		[deleteEdu.pending]: (state) => {
			state.loading = true;
		},
		[deleteEdu.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[deleteEdu.rejected]: (state) => {
			state.loading = false;
		},
		[deleteExp.pending]: (state) => {
			state.loading = true;
		},
		[deleteExp.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[deleteExp.rejected]: (state) => {
			state.loading = false;
		},
		[deleteUser.pending]: (state) => {
			state.loading = true;
		},
		[deleteUser.fulfilled]: (state, action) => {
			state.loading = false;
			state.profile = action.payload;
		},
		[deleteUser.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export default profile.reducer;
