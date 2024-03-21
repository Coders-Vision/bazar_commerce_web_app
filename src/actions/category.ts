"use server";

import { serverInstance } from "@/lib/axios";
import { Category } from "@/types/types";


export const getCategories = async (): Promise<Category[]> => {
  const response = await serverInstance.get(`/catalogue/client/categories`);
  return response.data.data;
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  const response = await serverInstance.get(`/catalogue/client/categories/${categoryId}`);
  return response.data.data;
};
