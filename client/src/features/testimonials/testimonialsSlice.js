import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultTestimonials } from "../../data/testimonials";
import {
    createTestimonialAPI,
    deleteTestimonialAPI,
    fetchTestimonialsAPI,
    updateTestimonialAPI,
} from "./testimonialsService";

const normalizeTestimonials = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => ({ ...item, id: item.id || item._id || item.name }));
  }

  if (value && Array.isArray(value.data)) {
    return value.data.map((item) => ({ ...item, id: item.id || item._id || item.name }));
  }

  return [];
};

const initialState = {
  testimonials: normalizeTestimonials(defaultTestimonials),
  testimonial: null,
  loading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, thunkAPI) => {
    try {
      const response = await fetchTestimonialsAPI();
      return normalizeTestimonials(response?.data || response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (payload, thunkAPI) => {
    try {
      const response = await createTestimonialAPI(payload);
      return normalizeTestimonials([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await updateTestimonialAPI(id, updates);
      return normalizeTestimonials([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async ({ id }, thunkAPI) => {
    try {
      await deleteTestimonialAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setTestimonials: (state, action) => {
      state.testimonials = normalizeTestimonials(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials = [action.payload, ...state.testimonials];
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.map((testimonial) => (
          testimonial.id === action.payload.id || testimonial._id === action.payload.id ? action.payload : testimonial
        ));
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial.id !== action.payload && testimonial._id !== action.payload
        );
      });
  },
});

export const { setTestimonials } = testimonialsSlice.actions;

export default testimonialsSlice.reducer;
