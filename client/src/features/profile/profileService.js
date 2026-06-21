import axios from "axios";

const API = "http://localhost:5000/api/profile";

export const fetchProfileAPI = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const updateProfileAPI = async (data, token) => {
  const res = await axios.put(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};