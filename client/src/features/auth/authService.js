import axios from "axios";

const API = `${import.meta.env.VITE_NODE_URL}/api/auth`;
    const login = async (credentials) => {
	const res = await axios.post(`${API}/login`, credentials);
	return res.data;
};

const register = async (data) => {
	const res = await axios.post(`${API}/register`, data);
	return res.data;
};

const me = async (token) => {
	const res = await axios.get(`${API}/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

const logout = () => {
	// client-side cleanup handled in slice (localStorage)
};

export default {
	login,
	register,
	me,
	logout,
};
