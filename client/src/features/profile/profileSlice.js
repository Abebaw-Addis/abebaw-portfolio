import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProfileAPI,
  deleteProfileAPI,
  fetchProfileAPI,
  fetchProfilesAPI,
  updateProfileAPI,
} from "./profileService";
import { profileData } from "../../data/homeData";

const normalizeProfile = (value) => {
  if (!value) {
    return null;
  }

  if (value.data) {
    return value.data;
  }

  return value;
};

const initialState = {
  profile: null,
  profiles: normalizeProfile(profileData),
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (id, thunkAPI) => {
    try {
      const response = await fetchProfileAPI(id);
      return normalizeProfile(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchProfiles = createAsyncThunk(
  "profile/fetchProfiles",
  async (_, thunkAPI) => {
    try {
      const response = await fetchProfilesAPI();
      return Array.isArray(response) ? response : response?.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async ({ data, token }, thunkAPI) => {
    try {
      const response = await createProfileAPI(data, token);
      return normalizeProfile(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, data, token }, thunkAPI) => {
    try {
      const response = await updateProfileAPI(id, data, token);
      return normalizeProfile(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await deleteProfileAPI(id, token);
      return { id, response };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearProfile: (state) => {
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch one profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all profiles
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create profile
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.profiles = [action.payload, ...state.profiles];
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;

        const index = state.profiles.findIndex(
          (p) => p._id === action.payload._id || p.id === action.payload._id
        );

        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = state.profiles.filter(
          (profile) => profile._id !== action.payload.id && profile.id !== action.payload.id
        );

        if (state.profile?._id === action.payload.id || state.profile?.id === action.payload.id) {
          state.profile = null;
        }
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;