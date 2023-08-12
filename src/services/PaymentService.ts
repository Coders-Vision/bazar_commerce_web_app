import { AxiosError } from "axios";
import { instance } from "./Client";

export const tapCheckout = async (data: { productIds: string[] }) => {
  const response = await instance.post(`/payment/checkout`, {
    ...data,
  });
  return response.data;
};
export const retreiveChargeId = async (chargeId: string): Promise<any> => {
  try {
    const response = await instance.get(`/payment/retrieve-charge/${chargeId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorResponse = err.response?.data;
    return errorResponse;
  }
};
