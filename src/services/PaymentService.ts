import { AxiosError } from "axios";
import { instance } from "./Client";

export const tapCheckout = async (data: { productIds: string[] }) => {
  const response = await instance.post(`/payment/tap/checkout`, {
    ...data,
  });
  return response.data;
};
export const getTransaction = async (transactionId: string): Promise<any> => {
  try {
    const response = await instance.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorResponse = err.response?.data;
    return errorResponse;
  }
};
