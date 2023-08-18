import { Size } from "@/types/types";
import { instance } from "./Client";

export const getSizes = async (): Promise<Size[]> => {
  const response = await instance.get(`/sizes`);
  return response.data;
};
