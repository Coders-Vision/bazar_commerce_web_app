import { Category } from "@/types";
import { instance } from "./Client";

export const getCategories = async (): Promise<Category[]> => {
  const response = await instance.get(`/categories`);
  return response.data;
};

export const getCategory = async (categoryId: string): Promise<Category> => {
  const response = await instance.get(`/categories/${categoryId}`);
  return response.data;
};
