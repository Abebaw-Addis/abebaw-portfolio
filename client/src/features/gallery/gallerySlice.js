import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultGalleryItems } from "../../data/galleryData";
import { createGalleryItemAPI, deleteGalleryItemAPI, fetchGalleryItemsAPI, updateGalleryItemAPI } from "./galleryService";

const normalizeGalleryItems = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => ({ ...item, id: item.id || item._id || item.title }));
  }

  if (value && Array.isArray(value.data)) {
    return value.data.map((item) => ({ ...item, id: item.id || item._id || item.title }));
  }

  return [];
};

const initialState = {
  galleryItems: normalizeGalleryItems(defaultGalleryItems),
  galleryItem: null,
  loading: false,
  error: null,
};

export const fetchGalleryItems = createAsyncThunk(
  "gallery/fetchGalleryItems",
  async (_, thunkAPI) => {
    try {
      const response = await fetchGalleryItemsAPI();
      return normalizeGalleryItems(response?.data || response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addGalleryItem = createAsyncThunk(
  "gallery/addGalleryItem",
  async (data, thunkAPI) => {
    try {
      const response = await createGalleryItemAPI(data);
      return normalizeGalleryItems([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateGalleryItem = createAsyncThunk(
  "gallery/updateGalleryItem",
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await updateGalleryItemAPI(id, updates);
      return normalizeGalleryItems([response?.data || response])[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteGalleryItem = createAsyncThunk(
  "gallery/deleteGalleryItem",
  async (id, thunkAPI) => {
    try {
      await deleteGalleryItemAPI(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleryItems: (state, action) => {
      state.galleryItems = normalizeGalleryItems(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryItems.fulfilled, (state, action) => {
        state.loading = false;
        state.galleryItems = action.payload;
      })
      .addCase(fetchGalleryItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addGalleryItem.fulfilled, (state, action) => {
        state.galleryItems = [action.payload, ...state.galleryItems];
      })
      .addCase(updateGalleryItem.fulfilled, (state, action) => {
        state.galleryItems = state.galleryItems.map((item) => (
          item.id === action.payload.id || item._id === action.payload.id ? action.payload : item
        ));
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action) => {
        state.galleryItems = state.galleryItems.filter((item) => item.id !== action.payload && item._id !== action.payload);
      });
  },
});

export const { setGalleryItems } = gallerySlice.actions;

export default gallerySlice.reducer;
