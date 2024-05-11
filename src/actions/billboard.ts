"use server";

// import { serverInstance } from "@/lib/axios";
import { serverInstance } from "@/lib/fetch-instance";
import { ResponseSuccess } from "@/types/api-response";
import { Billboard } from "@/types/types";

// export const getBillboards = async (): Promise<Billboard[]> => {
//   const response = await serverInstance.get(`/catalogue/client/billboards`);
//   return response.data.data;
// };

export const getBillboards = async (): Promise<Billboard[]> => {
  const response = await serverInstance<ResponseSuccess<Billboard[]>>(
    `/catalogue/client/billboards`
  );
  return response.data;
};
