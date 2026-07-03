import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/upload`;

const getToken = () => localStorage.getItem("token");

export const uploadImageAPI = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default {
  uploadImageAPI,
};
