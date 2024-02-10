import { AxiosError } from "axios";
import { instance } from "./Client";
import { OrderCreation } from "@/types/types";

export const createOrder = async (order: OrderCreation) => {
  const response = await instance.post(`/order`, order);
  return response.data;
};
export const getTransaction = async (transactionId: string): Promise<any> => {
  try {
    const response = await instance.get(`/transactions/${transactionId}`);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorResponse = err.response?.data;
    return errorResponse;
  }
};
