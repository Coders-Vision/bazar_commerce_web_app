import { Size } from "@/types/types";
import { instance } from "./Client";

export const getSizes = async (): Promise<Size[]> => {
  const response = await instance.get(`catalogue/client/sizes`);
  return response.data;
};
export const getSizesSWR = (sizesUrl: string) =>
  instance(sizesUrl).then((r) => r.data.data);
