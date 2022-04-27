import { baseRequestData, baseResponseData, resposneAction } from "../../shared/types";
import { leftDriveMotor, rightDriveMotor } from "./DRIVE";

export default async (data: baseRequestData) => {
  // leftDriveMotor.writeSync(0);
  // rightDriveMotor.writeSync(0);
  // leftDriveMotor.unexport();
  // rightDriveMotor.unexport();
  leftDriveMotor.write(0);
  rightDriveMotor.write(0);
  leftDriveMotor.destroy();
  rightDriveMotor.destroy();

    return JSON.stringify({
        action: resposneAction.NONE,
        message: "Successfully stopped!"
      } as baseResponseData);
};
