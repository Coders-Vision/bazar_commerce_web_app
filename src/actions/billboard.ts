"use server";

import { Billboard } from "@/types/types";
import { serverInstance } from "@/lib/axios";

export const getBillboards = async (): Promise<Billboard[]> => {
  const response = await serverInstance.get(`/catalogue/client/billboards`);
  return response.data.data;
};
