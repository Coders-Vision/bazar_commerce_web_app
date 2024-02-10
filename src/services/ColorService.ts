import { Color } from "@/types/types";
import { instance } from "./Client";

export const getColors = async (): Promise<Color[]> => {
  const response = await instance.get(`/catalogue/client/colors`);
  return response.data;
};
export const getColorsSWR = (colorUrl: string) =>
  instance(colorUrl).then((r) => r.data.data);
