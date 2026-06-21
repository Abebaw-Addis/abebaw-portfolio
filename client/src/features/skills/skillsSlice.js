import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
  loading: false,
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter(
        (s) => s._id !== action.payload
      );
    },
  },
});

export const { setSkills, addSkill, removeSkill } =
  skillsSlice.actions;

export default skillsSlice.reducer;