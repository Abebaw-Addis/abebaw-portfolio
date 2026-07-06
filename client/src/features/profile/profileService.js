import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/profile`;

export const createProfileAPI = async (data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await axios.post(API, data, { headers });
  return res.data;
};

export const fetchProfilesAPI = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const fetchProfileAPI = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const updateProfileAPI = async (id, data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await axios.put(`${API}/${id}`, data, { headers });
  return res.data;
};

export const deleteProfileAPI = async (id, token) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};