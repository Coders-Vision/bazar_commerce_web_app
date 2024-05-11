"use server";

import { headers } from "next/headers";
import { userAgent } from "next/server";

export const getDeviceInfoServer = () => {
  const headersList = headers();
  const userAgentStructure = { headers: headersList };
  const { isBot, browser, device, engine, os, cpu } =
    userAgent(userAgentStructure);

  const data = {
    // ipAddress: headersList.get("x-real-ip") || headersList.get("x-forwarded-for"),
    userAgent: headersList.get("user-agent") || "",
    isBot: isBot || false,
    browserName: browser.name || "",
    browserVersion: browser.version || "",
    deviceModel: device.model || "",
    deviceType: device.type || "",
    deviceVendor: device.vendor || "",
    engineName: engine.name || "",
    engineVersion: engine.version || "",
    osName: os.name || "",
    osVersion: os.version || "",
    cpuArchitecture: cpu.architecture || "",
  };
  return data;
};
