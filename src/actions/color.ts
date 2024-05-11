"use server";

// import { instance } from "../services/Client";
// import { serverInstance } from "@/lib/axios";
import { serverInstance } from "@/lib/fetch-instance";
import { ResponseSuccess } from "@/types/api-response";
import { Color } from "@/types/types";

// export const getColors = async (): Promise<Color[]> => {
//   const response = await serverInstance.get(`/catalogue/client/colors`);
//   return response.data;
// };

export const getColors = async (): Promise<Color[]> => {
  const response = await serverInstance<ResponseSuccess<Color[]>>(
    `catalogue/client/colors`
  );
  return response.data;
};

export const getColorsSWR = (colorUrl: string) =>
  serverInstance<ResponseSuccess<Color[]>>(colorUrl).then((r) => r.data);
