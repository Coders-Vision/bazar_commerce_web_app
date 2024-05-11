"use server";

// import { serverInstance } from "@/lib/axios";
import { serverInstance } from "@/lib/fetch-instance";
import { ResponseSuccess } from "@/types/api-response";
import { Category } from "@/types/types";

// export const getCategories = async (): Promise<Category[]> => {
//   const response = await serverInstance.get(`/catalogue/client/categories`);
//   return response.data.data;
// };

// export const getCategory = async (categoryId: string): Promise<Category> => {
//   const response = await serverInstance.get(`/catalogue/client/categories/${categoryId}`);
//   return response.data.data;
// };

export const getCategories = async (): Promise<Category[]> => {
  const response = await serverInstance<ResponseSuccess<Category[]>>(
    `/catalogue/client/categories`
  );
  return response.data;
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  const response = await serverInstance<ResponseSuccess<Category>>(
    `/catalogue/client/categories/${categoryId}`
  );
  return response.data;
};
