import api from "./api";

export const registerEvent = async (registrationData) => {
  const response = await api.post(
    "/api/registrations",
    registrationData
  );

  return response.data;
};

export const getRegistrations = async () => {
  const response = await api.get(
    "/api/registrations"
  );

  return response.data;
};
export const getMyRegistrations = async () => {
  const response = await api.get(
    "/api/registrations/my"
  );

  return response.data;
};