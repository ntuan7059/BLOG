import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
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

export const getPost = createAsyncThunk("post/getPost", async () => {
	try {
		const res = await axios.get("http://localhost:5000/api/posts", {
			headers: { "Content-Type": "application/json" },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const getPostById = createAsyncThunk("post/getPostById", async (id) => {
	try {
		const res = await axios.get(`http://localhost:5000/api/posts/${id}`, {
			headers: { "Content-Type": "application/json" },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
	try {
		const res = await axios.delete(`http://localhost:5000/api/posts/${id}`, {
			headers: { "Content-Type": "application/json" },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const likePost = createAsyncThunk("post/likePost", async (id) => {
	try {
		const res = await axios.put(`http://localhost:5000/api/posts/like/${id}`, {
			headers: { "Content-Type": "application/json" },
		});
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const unlikePost = createAsyncThunk("post/unlikePost", async (id) => {
	try {
		const res = await axios.put(
			`http://localhost:5000/api/posts/unlike/${id}`,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		return res.data;
	} catch (error) {
		console.log(error);
	}
});

export const postCmt = createAsyncThunk(
	"post/postCmt",
	async ({ id, text }, thunkAPI) => {
		try {
			const res = await axios.post(
				`http://localhost:5000/api/posts/comment/${id.postId}`,
				{ text },
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			return res;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return isRejectedWithValue(error.response);
		}
	}
);

export const deleteCmt = createAsyncThunk(
	"post/deleteCmt",
	async ({ postId, _id }, thunkAPI) => {
		try {
			const res = await axios.delete(
				`http://localhost:5000/api/posts/comment/${postId}/${_id}`
			);
			return res.data;
		} catch (error) {
			console.log(error);
		}
	}
);

const initialState = {
	postSing: [],
	posts: [],
	postId: null,
	loading: false,
	like: [],
	comment: [],
};

const post = createSlice({
	name: "post",
	initialState,
	reducers: {
		updatePosts: (state, action) => {
			state.posts = state.posts.filter((post) => post._id !== action.payload);
		},
		updateLike: (state, action) => {
			state.posts = state.posts.map((post) =>
				post._id === action.payload ? { ...post, likes: state.like } : post
			);
		},
		updateComment: (state, action) => {
			state.postId = { ...state.postId, comments: state.comment };
		},
		updateComment2: (state, action) => {
			state.postId = {
				...state.postId,
				comments: state.postId.comments.filter(
					(comment) => comment._id !== action.payload
				),
			};
		},
	},
	extraReducers: {
		[addPost.pending]: (state) => {
			state.loading = true;
		},
		[addPost.fulfilled]: (state, action) => {
			state.loading = false;
			state.postSing = action.payload;
		},
		[addPost.rejected]: (state) => {
			state.loading = false;
		},
		[getPost.pending]: (state) => {
			state.loading = true;
		},
		[getPost.fulfilled]: (state, action) => {
			state.loading = false;
			state.posts = action.payload;
		},
		[getPost.rejected]: (state) => {
			state.loading = false;
		},
		[getPostById.pending]: (state) => {
			state.loading = true;
		},
		[getPostById.fulfilled]: (state, action) => {
			state.loading = false;
			state.postId = action.payload;
		},
		[getPostById.rejected]: (state) => {
			state.loading = false;
		},
		[likePost.fulfilled]: (state, action) => {
			state.loading = false;
			state.like = action.payload;
		},
		[likePost.rejected]: (state) => {
			state.loading = false;
		},
		[unlikePost.pending]: (state) => {
			state.loading = true;
		},
		[unlikePost.fulfilled]: (state, action) => {
			state.loading = false;
			state.like = action.payload;
		},
		[unlikePost.rejected]: (state) => {
			state.loading = false;
		},
		[postCmt.pending]: (state) => {
			state.loading = true;
		},
		[postCmt.fulfilled]: (state, action) => {
			state.loading = false;
			state.comment = action.payload.data;
		},
		[postCmt.rejected]: (state) => {
			state.loading = false;
		},
		[deleteCmt.pending]: (state) => {
			state.loading = true;
		},
		[deleteCmt.fulfilled]: (state, action) => {
			state.loading = false;
			state.comment = action.payload;
		},
		[deleteCmt.rejected]: (state) => {
			state.loading = false;
		},
		[deletePost.pending]: (state) => {
			state.loading = true;
		},
		[deletePost.fulfilled]: (state, action) => {
			state.loading = false;
			state.postDeleted = action.payload;
		},
		[deletePost.rejected]: (state) => {
			state.loading = false;
		},
	},
});

export const { updatePosts, updateLike, updateComment, updateComment2 } =
	post.actions;
export default post.reducer;
