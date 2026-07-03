import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSkillAPI, deleteSkillAPI, fetchSkillsAPI, updateSkillAPI } from "./skillsService";
import { skillsData } from "../../data/skills";

const normalizeSkills = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => ({ ...item, id: item.id || item._id || item.name }));
  }

  if (value && Array.isArray(value.data)) {
    return value.data.map((item) => ({ ...item, id: item.id || item._id || item.name }));
  }

  return [];
};

const initialState = {
  skills: skillsData,
  skill: null,
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, thunkAPI) => {
    try {
      const response = await fetchSkillsAPI();
      return normalizeSkills(response?.data || response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addSkill = createAsyncThunk(
  "skills/addSkill",
  async (payload, thunkAPI) => {
    try {
      const response = await createSkillAPI(payload);
      return normalizeSkills([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await updateSkillAPI(id, updates);
      return normalizeSkills([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async ({ id }, thunkAPI) => {
    try {
      await deleteSkillAPI(id);
      return id;
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
      state.skills = normalizeSkills(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills = [action.payload, ...state.skills];
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.skills = state.skills.map((skill) => (
          skill.id === action.payload.id || skill._id === action.payload.id ? action.payload : skill
        ));
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((skill) => skill.id !== action.payload && skill._id !== action.payload);
      });
  },
});

export const { setSkills } = skillsSlice.actions;

export default skillsSlice.reducer;