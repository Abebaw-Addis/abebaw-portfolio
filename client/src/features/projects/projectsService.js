import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/projects`;
const getToken = () => localStorage.getItem("token");

export const fetchProjectsAPI = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const createProjectAPI = async (data) => {
  const token = getToken();
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateProjectAPI = async (id, updates) => {
  const token = getToken();
  const res = await axios.put(`${API}/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteProjectAPI = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
