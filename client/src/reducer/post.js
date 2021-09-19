import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addPost = createAsyncThunk("post/addPost", async (text) => {
	try {
		const res = await axios.post(
			"http://localhost:5000/api/posts",
			{ text },
			{ headers: { "Content-Type": "application/json" } }
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

const initialState = {
	post: null,
	posts: null,
	loading: false,
};

const post = createSlice({
	name: "post",
	initialState,
	reducers: {},
	extraReducers: {
		[addPost.pending]: (state) => {
			state.loading = true;
		},
		[addPost.fulfilled]: (state, action) => {
			state.loading = false;
			state.post = action.payload;
		},
		[addPost.rejected]: (state) => {
			state.loading = false;
		},
	},
});

//export const {} = post.actions
export default post.reducer;
