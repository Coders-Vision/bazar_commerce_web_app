import { Color } from "@/types/types";
import { instance } from "./Client";

export const getColors = async (): Promise<Color[]> => {
  const response = await instance.get(`/colors`);
  return response.data;
};
