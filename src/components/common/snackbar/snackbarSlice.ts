import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  showDuration: number;
}

interface ShowSnackbarPayload {
  message?: string;
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  showDuration?: number;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  vertical: "top",
  horizontal: "center",
  showDuration: 4000,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
      state.open = true;
      state.message = action.payload.message || "Something went wrong!";
      state.vertical = action.payload.vertical || "top";
      state.horizontal = action.payload.horizontal || "center";
      state.showDuration = action.payload.showDuration || 4000;
    },
    hideSnackbar: (state) => {
      state.open = false;
      state.message = "";
      state.vertical = "top";
      state.horizontal = "center";
      state.showDuration = 4000;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
