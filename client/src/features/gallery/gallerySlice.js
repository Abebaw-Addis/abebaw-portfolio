import { createSlice } from "@reduxjs/toolkit";
import aidmsTeam from "../../assets/aidms team.jpg";
import unityLeader from "../../assets/unity-leader.jpg";
import unityMember from "../../assets/unity-member.jpg";
import galleryHero from "../../assets/user.png";

const storageKey = "portfolio-gallery";

const defaultGalleryItems = [
  {
    id: "gallery-1",
    src: aidmsTeam,
    title: "AI-DMS Team",
    description: "A snapshot of the AI-Based IDS team collaboration.",
    technologies: ["Python", "TensorFlow", "Scapy"],
  },
  {
    id: "gallery-2",
    src: unityLeader,
    title: "Team Leader",
    description: "Leadership and direction for the project development cycle.",
    technologies: ["React", "Node", "MongoDB"],
  },
  {
    id: "gallery-3",
    src: unityMember,
    title: "Team Member",
    description: "A team member contributing to the project build and integration.",
    technologies: ["Android", "Java", "MySQL"],
  },
  {
    id: "gallery-4",
    src: galleryHero,
    title: "Portfolio Hero",
    description: "Artistically styled portfolio preview as a gallery hero image.",
    technologies: ["Design", "UX", "Branding"],
  },
];

const readGalleryFromStorage = () => {
  if (typeof window === "undefined") {
    return defaultGalleryItems;
  }

  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : defaultGalleryItems;
  } catch {
    return defaultGalleryItems;
  }
};

const persistGallery = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }
};

const initialState = {
  galleryItems: readGalleryFromStorage(),
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleryItems: (state, action) => {
      state.galleryItems = action.payload;
      persistGallery(action.payload);
    },
    addGalleryItem: (state, action) => {
      const item = {
        ...action.payload,
        id: action.payload.id || `${Date.now()}-${Math.random()}`,
        technologies: Array.isArray(action.payload.technologies)
          ? action.payload.technologies
          : action.payload.technologies?.split(",").map((value) => value.trim()).filter(Boolean) || [],
      };
      state.galleryItems = [item, ...state.galleryItems];
      persistGallery(state.galleryItems);
    },
    removeGalleryItem: (state, action) => {
      state.galleryItems = state.galleryItems.filter((item) => item.id !== action.payload);
      persistGallery(state.galleryItems);
    },
  },
});

export const { setGalleryItems, addGalleryItem, removeGalleryItem } = gallerySlice.actions;

export default gallerySlice.reducer;
