import { Device, devices } from "node-hid";
import {
  baseRequestData,
  baseResponseData,
  logRequestData,
  logResponseData,
} from "./types";

export const parseData = (data: string): baseRequestData | baseResponseData =>
  JSON.parse(data);

export const log = (data: logRequestData | logResponseData) =>
  console.log(`[${data.type} | ${data.context}] ${data.message} `);

export const getHIDDevices = (): Device[] => devices();
