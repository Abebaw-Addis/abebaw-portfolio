import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/skills`;
const getToken = () => localStorage.getItem("token");

const buildSkillRequestConfig = (data) => {
  const token = getToken();
  const isFormData = typeof FormData !== "undefined" && data instanceof FormData;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
  };
};

export const createSkillAPI = async (data) => {
  const config = buildSkillRequestConfig(data);
  const res = await axios.post(API, data, config);
  return res.data;
};

export const fetchSkillsAPI = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const updateSkillAPI = async (id, updates) => {
  const config = buildSkillRequestConfig(updates);
  const res = await axios.put(`${API}/${id}`, updates, config);
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
