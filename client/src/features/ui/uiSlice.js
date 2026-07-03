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
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setLoading } = uiSlice.actions;

export default uiSlice.reducer;