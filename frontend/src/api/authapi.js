import axios from "axios";
const API_URL = "http://localhost:8000/api/users";

export const Login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    },{
        withCredentials:true
    },);
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

export const getSession= async ()=>{
    try{
        const response = await axios.get(`${API_URL}/session`,{withCredentials:true});
        return response;
    }catch(err){
        throw err;
    }
}
