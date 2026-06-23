import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { skillsData } from "../../data/skills";
import { createSkillAPI } from "./skillsService";

const initialState = {
  skills: skillsData,
  skill: null,
  loading: false,
  error: null,
};



export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async ({ data, token }, thunkAPI) => {
    const authToken = token || thunkAPI.getState().profile?.profile?.token;
    try {
      return await createSkillAPI(data, authToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(createSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills.push(action.payload);
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSkills, addSkill, removeSkill } =
  skillsSlice.actions;

export default skillsSlice.reducer;