"use server";

import { Color } from "@/types/types";
import { instance } from "../services/Client";
import { serverInstance } from "@/lib/axios";

export const getColors = async (): Promise<Color[]> => {
  const response = await serverInstance.get(`/catalogue/client/colors`);
  return response.data;
};
export const getColorsSWR = (colorUrl: string) =>
serverInstance(colorUrl).then((r) => r.data.data);
