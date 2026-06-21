import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import skillsReducer from "../features/skills/skillsSlice";
import projectsReducer from "../features/projects/projectsSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    ui: uiReducer,
  },
});