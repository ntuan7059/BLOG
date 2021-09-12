import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const alert = createSlice({
	name: "alert",
	initialState,
	reducers: {
		SET_ALERT(state, action) {
			state.push(action.payload);
		},
		REMOVE_ALERT(state, action) {
			state.splice(alert[0]);
		},
	},
});

export const { SET_ALERT, REMOVE_ALERT } = alert.actions;
export default alert.reducer;
