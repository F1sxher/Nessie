import {
  baseRequestData,
  baseResponseData,
  resposneAction,
} from "../../shared/types";

export default async (data: baseRequestData): Promise<string> => {
  return JSON.stringify({
    action: resposneAction.PONG,
  } as baseResponseData);
};
