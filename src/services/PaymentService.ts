import { AxiosError } from "axios";
import { instance } from "./Client";

export const tapCheckout = async (data: { productIds: string[] }) => {
  const response = await instance.post(`/payment/tap/checkout`, {
    ...data,
  });
  return response.data;
};
export const tapRetreiveChargeId = async (chargeId: string): Promise<any> => {
  try {
    const response = await instance.get(`/payment/tap/retrieve-charge/${chargeId}`);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorResponse = err.response?.data;
    return errorResponse;
  }
};
