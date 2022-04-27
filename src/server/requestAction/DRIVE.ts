import { Gpio } from "onoff";
import { SoftPWM } from 'raspi-soft-pwm';
import {
    baseRequestData,
    baseResponseData,
    driveRequestData,
    resposneAction,
} from "../../shared/types";

const leftDriveMotorPin = 0;
const rightDriveMotorPin = 0;

// export const leftDriveMotor = new Gpio(leftDriveMotorPin, "out");
// export const rightDriveMotor = new Gpio(rightDriveMotorPin, "out");
export const leftDriveMotor = new SoftPWM("GPIO1");
export const rightDriveMotor = new SoftPWM("GPIO0");


export default async (data: driveRequestData): Promise<string> => {
    if (data.leftSpeed < 0) data.leftSpeed = 0;
    if (data.leftSpeed > 1) data.rightSpeed = 1;
    if (data.rightSpeed < 0) data.rightSpeed = 0;
    if (data.rightSpeed > 1) data.rightSpeed = 1;

    // //@ts-ignore
    // leftDriveMotor.writeSync(data.leftSpeed);
    // // @ts-ignore
    // rightDriveMotor.writeSync(data.rightSpeed);
    leftDriveMotor.write(data.leftSpeed);
    rightDriveMotor.write(data.rightSpeed)

    return JSON.stringify({
        action: resposneAction.PONG,
    } as baseResponseData);
};

process.on("SIGINT", () => {
    // leftDriveMotor.unexport();
    // rightDriveMotor.unexport();
    leftDriveMotor.destroy();
    rightDriveMotor.destroy();
})