"use server";

import { AxiosError } from "axios";
// import { instance } from "../services/Client";
import { Cart, OrderCreation, OrderSummaryCreation } from "@/types/types";
import { ResponseSuccess } from "@/types/api-response";
import { serverInstance } from "@/lib/axios";
import { serverInstance as serverInstanceFetch } from "@/lib/fetch-instance";

export const createOrderSummary = async (cart: OrderSummaryCreation) => {
  const response = await serverInstance.post(`/order/client/order-summary`, cart);
  return response.data;
};

// export const createOrderSummary = async (cart: OrderSummaryCreation) => {
//   const response = await serverInstanceFetch<any>(
//     `/order/client/order-summary`,
//     {
//       method: "POST",
//       body: JSON.stringify(cart),
//     }
//   );
//   return response;
// };

export const getOrderSummaryById = async (orderSummaryId: string) => {
  const response = await serverInstance.get(
    `/order/client/order-summary/${orderSummaryId}`
  );
  return response;
};

export const createOrder = async (orderCreation: OrderCreation) => {
  const response = await serverInstance.post(
    `/order/client/orders`,
    orderCreation
  );
  return response.data;
};

export const getTransaction = async (transactionId: string): Promise<any> => {
  try {
    const response = await serverInstance.get(
      `/finance/client/transactions/${transactionId}`
    );
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    const errorResponse = err.response?.data;
    return errorResponse;
  }
};
