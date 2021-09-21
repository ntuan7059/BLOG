import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducer/alert";
import auth from "./reducer/auth";
import profile from "./reducer/profile";
import post from "./reducer/post";

export const store = configureStore({
	reducer: {
		alert: alertReducer,
		auth: auth,
		profile: profile,
		post: post,
	},
});
