import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProjectAPI, deleteProjectAPI, fetchProjectsAPI, updateProjectAPI } from "./projectsService";
import { projectsData } from "../../data/projects";

const normalizeProjects = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => ({ ...item, id: item.id || item._id || item.title }));
  }

  if (value && Array.isArray(value.data)) {
    return value.data.map((item) => ({ ...item, id: item.id || item._id || item.title }));
  }

  return [];
};

const initialState = {
  projects: projectsData,
  project: null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, thunkAPI) => {
    try {
      const response = await fetchProjectsAPI();
      return normalizeProjects(response?.data || response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data, thunkAPI) => {
    try {
      const response = await createProjectAPI(data);
      return normalizeProjects([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await updateProjectAPI(id, updates);
      return normalizeProjects([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      await deleteProjectAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = normalizeProjects(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects = [action.payload, ...state.projects];
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((project) => (
          project.id === action.payload.id || project._id === action.payload.id ? action.payload : project
        ));
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project.id !== action.payload && project._id !== action.payload);
      });
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;