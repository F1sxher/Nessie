import { HID } from "node-hid";
import BaseJoystickController from "./BaseJoystickController";

export default class XboxController extends BaseJoystickController {
  protected device: HID = null;

  public static vendorId: number = 1118;
  public static productId: number = 767;

  constructor([vendorId, productId]: number[]) {
    super();
    this.device = new HID(vendorId, productId);

    this.device.on("data", (data) => {
      console.log(data);
    });
  }
}
