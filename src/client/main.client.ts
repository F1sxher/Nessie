import Websocket from "ws";
import { HID } from "node-hid";
import LogitechJoystickController from "../shared/Controllers/LogitechJoystickController";
import {
  baseRequestData,
  baseResponseData,
  logType,
  requestAction,
} from "../shared/types";
import { log, parseData } from "../shared/utils";

const address: string = "192.168.68.137:8080";

let ws: Websocket = new Websocket(null);

const loop = (
  Controller1: LogitechJoystickController,
  Controller2: LogitechJoystickController
): boolean => {
  if (
    Controller1.getButton(11) ||
    Controller1.getButton(12) ||
    Controller2.getButton(11) ||
    Controller2.getButton(12)
  ) {
    if (ws && ws.OPEN) {
      console.log("STOPPING...");
      ws.send(
        JSON.stringify({
          action: requestAction.STOP,
        } as baseRequestData)
      );
    }
  }

  // console.log(Controller1.getPitch());

  return true;
};

const init = async () => {
  ws = new Websocket(`ws://${address}`);

  ws.on("open", () => {
    console.log(`Connected to ${address}!`);

    // new LogitechJoystickController([1133, 49685]);

    const Controller1 = new LogitechJoystickController(
      "\\\\?\\hid#vid_046d&pid_c215#7&573e57f&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}"
    );
    const Controller2 = new LogitechJoystickController(
      "\\\\?\\hid#vid_046d&pid_c215#7&2adb5522&0&0000#{4d1e55b2-f16f-11cf-88cb-001111000030}"
    );

    const interval = setInterval(() => {
      loop(Controller1, Controller2);
    }, 100);
  });
};

init();

ws.on("message", async (data) => {
  const parsedData = parseData(data.toString()) as baseResponseData;

  // console.log(parsedData);
});

ws.on("close", async (code, data) => {
  const parsedData = parseData(data.toString()) as baseResponseData;

  log({
    type: logType.WARNING,
    message: `Server closed with code: ${code}`,
    context: "SERVER CLOSED",
    action: requestAction.LOG,
  });
  console.log(parsedData);

  process.exit();
});
