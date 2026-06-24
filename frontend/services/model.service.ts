import { api } from "./api";

export async function getModels() {
  const response = await api.get("/models");

  return response.data;
}