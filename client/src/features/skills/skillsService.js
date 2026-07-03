import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/skills`;
const getToken = () => localStorage.getItem("token");

export const createSkillAPI = async (data) => {
  const token = getToken();
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchSkillsAPI = async () => {
  const res = await axios.get(API);
  console.log("Fetched skills:", res.data); // Log the fetched data for debugging

  return res.data;
};

export const updateSkillAPI = async (id, updates) => {
  const token = getToken();
  const res = await axios.put(`${API}/${id}`, updates, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteSkillAPI = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
