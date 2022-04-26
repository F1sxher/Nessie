import Websocket, { WebSocketServer } from "ws";
import {
  baseRequestData,
  baseResponseData,
  requestAction,
  resposneAction,
} from "../shared/types";
import { parseData } from "../shared/utils";
import pingAction from "./requestAction/PING";

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
  console.log(`New Connection from ${req.socket.remoteAddress}`);

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
      default:
        break;
    }

    ws.send(returnData);
  });

  ws.on("ping", async (data) => {
    ws.pong(data);
  });
});
