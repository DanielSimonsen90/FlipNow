import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";

import { Promiseable } from "types";
import { API_ENDPOINT_SECURE_SIGNALR } from "utils";

import { HubActionNames, HubActions } from "./Actions/HubActionTypes";
import { HubEventNames, HubEvents } from "./Events/HubEventTypes";

export default class FlipNowHubConnection {
  private static _instance: FlipNowHubConnection;
  private static _hubConnectionSecure = new HubConnectionBuilder()
    .withUrl(API_ENDPOINT_SECURE_SIGNALR)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  private _hubConnection: HubConnection = FlipNowHubConnection._hubConnectionSecure;
  private _callbacks: Map<Function, (...args: any[]) => void> = new Map();
  private _startUpQueue = new Array<[action: HubActionNames, ...args: any[]]>();

  constructor() {
    this._hubConnection = FlipNowHubConnection._hubConnectionSecure;
    this._hubConnection.start()
      .then(() => {
        var interval = setInterval(async function executeSendQueue(this: FlipNowHubConnection) {
          if (this._hubConnection.state !== HubConnectionState.Connected) return;

          for (const [action, ...args] of this._startUpQueue) {
            await this.send(action, ...args as any);
          }
          this._startUpQueue.length = 0;
          clearInterval(interval);
        }.bind(this), 100);
      })
      .catch(console.error);
  }

  public on<
    EventName extends HubEventNames,
    Arguments extends HubEvents[EventName]
  >(event: EventName, callback: (...args: Arguments) => Promiseable<void>) {
    const _callback = (...args: any[]) => {
      console.log(`Received ${event} event`, args);
      callback(...args as Arguments);
    };
    this._hubConnection.on(event, _callback);
    this._callbacks.set(callback, _callback);
  };

  public async send<
    Action extends HubActionNames,
    Arguments extends HubActions[Action]
  >(action: Action, ...args: Arguments) {
    if (this._hubConnection.state !== HubConnectionState.Connected) {
      // return console.warn("Hub connection is not connected");
      this._startUpQueue.push([action, ...args])
    }
    console.log(`Sending ${action} action`, args);
    return this._hubConnection.send(action as string, ...args);
  };

  public off<
    EventName extends HubEventNames,
    Arguments extends HubEvents[EventName]
  >(event: EventName, callback: (...args: Arguments) => Promiseable<void>) {
    const _callback = this._callbacks.get(callback);
    if (!_callback) return console.warn(`Callback for ${event} event not found`);
    // console.log(`Removing ${event} event callback`);

    this._hubConnection.off(event as string, _callback);
  }

  public static getInstance(): FlipNowHubConnection {
    if (!FlipNowHubConnection._instance) FlipNowHubConnection._instance = new FlipNowHubConnection();
    return FlipNowHubConnection._instance;
  }
}

export type FlipNowHubConnectionType = FlipNowHubConnection;