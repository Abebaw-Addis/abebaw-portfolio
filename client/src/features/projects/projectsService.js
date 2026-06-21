import axios from "axios";

const API = "http://localhost:5000/api/projects";

export const fetchProjectsAPI = async () => {
  const res = await axios.get(API);
  return res.data;
};