import { serverInstance } from "@/lib/axios";
import { AxiosError } from "axios";

export const signIn = async (formData: any) => {
  try {
    const res = await serverInstance.post("/auth/signin", formData);
    return res.data;
  } catch (error) {
    const err = error as AxiosError;
    console.log("[SIGN_IN]", err);
    const errorResponse = err.response?.data;
    return errorResponse;
  }
};
