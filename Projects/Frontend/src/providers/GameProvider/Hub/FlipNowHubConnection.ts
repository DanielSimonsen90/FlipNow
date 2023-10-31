
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { API_ENDPOINT_SECURE_SIGNALR, API_ENDPOINT_SIGNALR } from "utils";
import { HubEventNames, HubEvents } from "./HubEvents";
import { Promiseable } from "types";
import { ActiveGame } from "models/backend";

export default class FlipNowHubConnection {
  private static _hubConnectionSecure = new HubConnectionBuilder()
    .withUrl(API_ENDPOINT_SECURE_SIGNALR)
    .configureLogging(LogLevel.Information)
    .build();
  // private static _hubConnectionUnsecure = new HubConnectionBuilder()
  //   .withUrl(API_ENDPOINT_SIGNALR)
  //   .configureLogging(LogLevel.Information)
  //   .build();

  private _hubConnection: HubConnection = FlipNowHubConnection._hubConnectionSecure;
  private _callbacks: Map<Function, (...args: any[]) => void> = new Map();

  private _started = false;
  public get started() {
    return this._started;
  }
  public start() {
    if (this._started) return;
    this._started = true;

    return FlipNowHubConnection._hubConnectionSecure
      .start()
      .then(this.onHubConnectionStarted("Secure"))
      .catch(this.onHubConnectionError("Secure"));

    // FlipNowHubConnection._hubConnectionUnsecure
    //   .start()
    //   .then(this.onHubConnectionStarted("Unsecure"))
    //   .catch(this.onHubConnectionError("Unsecure"));
  }
  public stop() {
    if (!this._started) return;
    
    this._hubConnection.stop();
    // FlipNowHubConnection._hubConnectionUnsecure.stop();
    
    this._started = false;
  }

  private onHubConnectionStarted = (type: string) => () => {
    console.log(`(${type}) Hub connection started`);
    this._hubConnection = type === "Secure"
      ? FlipNowHubConnection._hubConnectionSecure
      // : FlipNowHubConnection._hubConnectionUnsecure;
      : undefined as any;
  };
  private onHubConnectionError = (type: string) => (err: Error) => {
    console.error(`(${type}) Hub connection error`, err);
  };

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

  public invoke<
    EventName extends HubEventNames,
    Arguments extends HubEvents[EventName]
  >(event: EventName, game: ActiveGame, ...args: Arguments) {
    if (!this._started) throw new Error("Hub connection not started");
    console.log(`Invoking ${event} event`, args);
    return this._hubConnection.send(event as string, game.inviteCode, ...args);
  };

  public off<
    EventName extends HubEventNames,
    Arguments extends HubEvents[EventName]
  >(event: EventName, callback: (...args: Arguments) => Promiseable<void>) {
    const _callback = this._callbacks.get(callback);
    if (!_callback) return console.warn(`Callback for ${event} event not found`);
    console.log(`Removing ${event} event callback`);

    this._hubConnection.off(event as string, _callback);
  }

  public invokeHandlerLater<
    EventName extends HubEventNames,
    Arguments extends HubEvents[EventName]
    >(event: EventName, game: ActiveGame): (...args: Arguments) => Promise<void> {
    return (...args: Arguments) => this.invoke(event, game, ...args);
  }
}