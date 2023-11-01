
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { API_ENDPOINT_SECURE_SIGNALR, API_ENDPOINT_SIGNALR } from "utils";
import { HubActionNames, HubActions, HubEventNames, HubEvents } from "./HubTypes";
import { Promiseable } from "types";
import { ActiveGame } from "models/backend";

class InternalFlipNowHubConnection {
  private static _instance: InternalFlipNowHubConnection;
  private static _hubConnectionSecure = new HubConnectionBuilder()
    .withUrl(API_ENDPOINT_SECURE_SIGNALR)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  private _hubConnection: HubConnection = InternalFlipNowHubConnection._hubConnectionSecure;
  private _callbacks: Map<Function, (...args: any[]) => void> = new Map();
  private _startUpQueue = new Array<[action: HubActionNames, inviteCode: string, ...args: any[]]>();

  constructor() {
    this._hubConnection = InternalFlipNowHubConnection._hubConnectionSecure;
    this._hubConnection.start()
      .then(() => {
        var interval = setInterval(async function executeSendQueue(this: InternalFlipNowHubConnection) {
          if (this._hubConnection.state !== HubConnectionState.Connected) return;

          for (const [action, inviteCode, ...args] of this._startUpQueue) {
            await this.send(action, { inviteCode }, ...args as any);
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
    this._hubConnection.on(event as string, _callback);
    this._callbacks.set(callback, _callback);
  };

  public async send<
    Action extends HubActionNames,
    Arguments extends HubActions[Action]
  >(action: Action, game: Pick<ActiveGame, 'inviteCode'>, ...args: Arguments) {
    if (this._hubConnection.state !== HubConnectionState.Connected) {
      // return console.warn("Hub connection is not connected");
      this._startUpQueue.push([action, game.inviteCode, ...args])
    }
    console.log(`Sending ${action} action`, args);
    // return this._hubConnection.invoke(action as string, ...args);
    return this._hubConnection.send(action as string, game.inviteCode, ...args);
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

  public sendHandlerLater<
    Action extends HubActionNames,
    Arguments extends HubActions[Action]
  >(action: Action, game: Pick<ActiveGame, 'inviteCode'>) {
    return (...args: Arguments) => this.send(action, game, ...args);
  }

  public static getInstance(): InternalFlipNowHubConnection {
    if (!InternalFlipNowHubConnection._instance) InternalFlipNowHubConnection._instance = new InternalFlipNowHubConnection();
    return InternalFlipNowHubConnection._instance;
  }
}

export type FlipNowHubConnection = InternalFlipNowHubConnection;
export default InternalFlipNowHubConnection.getInstance();