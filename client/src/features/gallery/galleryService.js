import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/gallery`;
const getToken = () => localStorage.getItem("token");

export const fetchGalleryItemsAPI = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const createGalleryItemAPI = async (data) => {
  const token = getToken();
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateGalleryItemAPI = async (id, updates) => {
  const token = getToken();
  const res = await axios.put(`${API}/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteGalleryItemAPI = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
