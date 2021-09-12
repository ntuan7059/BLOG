import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducer/alert";
import auth from "./reducer/auth";

export const store = configureStore({
	reducer: {
		alert: alertReducer,
		auth: auth,
	},
});
