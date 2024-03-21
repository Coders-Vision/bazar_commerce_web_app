"use server";

import { Size } from "@/types/types";
import { instance } from "../services/Client";
import { serverInstance } from "@/lib/axios";

export const getSizes = async (): Promise<Size[]> => {
  const response = await serverInstance.get(`catalogue/client/sizes`);
  return response.data;
};
export const getSizesSWR = (sizesUrl: string) =>
  serverInstance(sizesUrl).then((r) => r.data.data);
