import { baseRequestData, baseResponseData, resposneAction } from "../../shared/types";

export default async (data: baseRequestData) => {
    return JSON.stringify({
        action: resposneAction.NONE,
        message: "Successfully stopped!"
      } as baseResponseData);
};
