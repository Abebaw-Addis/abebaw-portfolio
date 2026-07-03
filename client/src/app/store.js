import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import galleryReducer from "../features/gallery/gallerySlice";
import profileReducer from "../features/profile/profileSlice";
import projectsReducer from "../features/projects/projectsSlice";
import skillsReducer from "../features/skills/skillsSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    gallery: galleryReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});