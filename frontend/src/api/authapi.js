import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8000/api/users";

export const Login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const Signup = async ({ username, email, fullName, password }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      fullname:fullName,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
