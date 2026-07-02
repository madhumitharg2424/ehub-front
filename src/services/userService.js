import api from "./api";

export const getUserByEmail = async (email) => {
  const response = await api.get(
    `/api/users/email/${email}`
  );

  return response.data;
};