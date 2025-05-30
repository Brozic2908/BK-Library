import api from "./api";

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("auth/login", { email, password });
      return response.data;
    } catch (error) {
      console.error("Erro in fetch API Login: ", error);
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post("auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Erro in fetch API Register: ", error);
    }
  },
};

export default authService;
