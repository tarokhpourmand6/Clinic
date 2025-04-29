import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'خطا در اتصال به سرور' };
  }
};