import { HID } from "node-hid";

export default abstract class BaseJoystickController {
  /**
   * The HID Device
   */
  protected abstract device: HID | null;

  constructor() {}
}
