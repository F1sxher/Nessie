import Websocket, { WebSocketServer } from "ws";
import {
  baseRequestData,
  baseResponseData,
  logType,
  requestAction,
  resposneAction,
} from "../shared/types";
import { log, parseData } from "../shared/utils";
import pingAction from "./requestAction/PING";
import STOP from "./requestAction/STOP";

const doTest: boolean = true;

const wss = new WebSocketServer({
  port: 8080,
  //   perMessageDeflate: {
  //     zlibDeflateOptions: {
  //       chunkSize: 1024,
  //       memLevel: 7,
  //       level: 3,
  //     },
  //     zlibInflateOptions: {
  //       chunkSize: 10 * 1024,
  //     },
  //     clientNoContextTakeover: true,
  //     serverNoContextTakeover: true,
  //     serverMaxWindowBits: 10,
  //     concurrencyLimit: 10,
  //     threshold: 1024,
  //   },
});

wss.on("connection", (ws, req) => {
  log({
    type: logType.INFO,
    context: "Connections",
    message: `New Connection from ${req.socket.remoteAddress}`,
    action: requestAction.LOG,
  });

  ws.on("message", async (data) => {
    const parsedData = parseData(data.toString()) as baseRequestData;

    let returnData: string = JSON.stringify({
      action: resposneAction.NONE,
    } as baseResponseData);

    switch (parsedData.action) {
      case requestAction.LOG:
        break;
      // case requestAction.PING:
      //   returnData = await pingAction(parsedData);
      //   break;
       case requestAction.STOP:
         returnData = await STOP(parsedData);
         ws.close(1000, returnData);
         process.exit();
      default:
        break;
    }

    ws.send(returnData);
  });

  ws.on("ping", async (data) => {
    ws.pong(data);
  });
});
