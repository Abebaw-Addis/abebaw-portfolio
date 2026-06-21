import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme =
        state.theme === "dark" ? "light" : "dark";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleTheme, setLoading } =
  uiSlice.actions;

export default uiSlice.reducer;