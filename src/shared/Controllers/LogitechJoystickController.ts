import { HID } from "node-hid";
import { LogitechControlsInterface } from "../types";
import BaseJoystickController from "./BaseJoystickController";

export default class LogitechJoystickController extends BaseJoystickController {
  protected device: HID | null = null;

  public static defaultVendorId: number = 1133;
  public static defaultProductId: number = 49685;
  //   public defaultVendorId: number = 1133;
  //   public defaultProductId: number = 49685;
  public controls: LogitechControlsInterface = {
    roll: 0,
    pitch: 0,
    yaw: 0,
    view: 0,
    throttle: 0,
    buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  constructor(path: string | number[]) {
    super();
    // this.device = new HID(vendorId, productId);
    if (typeof path === "string") {
      this.device = new HID(path);
    } else {
      this.device = new HID(path[0], path[1]);
    }

    if (this.device)
      this.device.on("data", (data: Buffer) => {
        //@ts-ignore
        const ch = data
          ?.toString("hex")
          .match(/.{1,2}/g)
          .map(function(c) {
            return parseInt(c, 16);
          });

        const newControls: LogitechControlsInterface = {
          roll: ((ch[1] & 0x03) << 8) + ch[0],
          pitch: ((ch[2] & 0x0f) << 6) + ((ch[1] & 0xfc) >> 2),
          yaw: ch[3],
          view: (ch[2] & 0xf0) >> 4,
          throttle: -ch[5] + 255,
          buttons: [
            (ch[4] & 0x01) >> 0,
            (ch[4] & 0x02) >> 1,
            (ch[4] & 0x04) >> 2,
            (ch[4] & 0x08) >> 3,
            (ch[4] & 0x10) >> 4,
            (ch[4] & 0x20) >> 5,
            (ch[4] & 0x40) >> 6,
            (ch[4] & 0x80) >> 7,

            (ch[6] & 0x01) >> 0,
            (ch[6] & 0x02) >> 1,
            (ch[6] & 0x04) >> 2,
            (ch[6] & 0x08) >> 3,
          ],
        };

        this.controls = newControls;
      });
  }

  /**
   *
   *
   * @param button number
   * @returns boolean
   */
  public getButton(button: number): boolean {
    return this.controls.buttons[button - 1] === 1;
  }
}
