import { toast } from "react-toastify";
import api from "./api";

const userService = {
  getAllUsers: async () => {
    try {
      const response = await api.get("users");
      return response.data;
    } catch (error) {
      console.error("Erro in fetch API getAllUsers: ", error);
    }
  },
  getUserById: async (id) => {
    try {
      const response = await api.get(`users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro in fetch API getUserById: ", error);
    }
  },
  updateUserInfo: async (id, userData) => {
    try {
      const response = await api.patch(`users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Erro in fetch API updateUserInfo: ", error);
    }
  },
  updateUserInfoByAdmin: async (id, userData) => {
    try {
      const response = await api.patch(`users/${id}/update`, userData);
      return response.data.data.user;
    } catch (error) {
      console.error("Erro in fetch API updateUserInfoByAdmin: ", error);
    }
  },
  updatePassword: async (userData) => {
    try {
      const response = await api.patch("auth/updatePassword", userData);
      return response.data;
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401 && data.message === "Mật khẩu cữ không chính xác") {
        toast.error("Mật khẩu cữ không chính xác");
      }
      console.error("Erro in fetch API updatePassword: ", error);
    }
  },
};

export default userService;
