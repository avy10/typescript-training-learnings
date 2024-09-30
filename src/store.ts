import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./components/posts/postSlice";
import messageSnackbarReducer from "./components/common/snackbar/snackbarSlice";

const store = configureStore({
	reducer: {
		posts: postsReducer,
		messageSnackbar: messageSnackbarReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/* 
Reference : 
  https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
*/
export default store;
