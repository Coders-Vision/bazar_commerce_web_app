"use server";

// import { getDeviceInfoServer } from "@/utils/get-client-server";

const BASE_URL: string = `${process.env.BE_API_URL}/api`;

const headers: HeadersInit = {
  Accept: "*/*",
  "X-Request-Source": "website",
  "Content-Type": "application/json",
};

export const serverInstance = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  //   const getDeviceInfo = await getDeviceInfoServer();
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      ...headers,
      //   "X-Browser-Data": JSON.stringify(getDeviceInfo),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const reponseData = await response.json();
  return reponseData;
};
