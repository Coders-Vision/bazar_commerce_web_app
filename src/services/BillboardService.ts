import { Billboard } from "@/types/types";
import { instance } from "./Client";

export const getBillboards = async (): Promise<Billboard[]> => {
  const response = await instance.get(`/catalogue/client/billboards`);
  return response.data.data;
};
