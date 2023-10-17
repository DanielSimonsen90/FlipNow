# SignalR

## Functionality Role
The role SignalR plays in an application, what end it belongs and how to achieve communication between back- and frontend.

### Backend
SignalR is a backend broadcaster. Frontend subscribes to the backend URL and posts messages. SignalR does not need a controller to function, however it does need its own endpoint the frontend can subscribe to.

### Frontend
The frontend should subscribe to the backend SignalR URL. After starting its listener, it should subscribe to its events using the frontend SignalR library with "on". Here, the client can subscribe to event and handle it like if they're using Node.js EventEmitter.
After receiving events, the frontend can do whatever it wants with the data.

### Hubs
A hub is like a channel or a station to listen to. The hub will broadcast events to its susbcribers. You would use one hub for one scenario, just like YouTubers make different channels per topic. Your subscribers may not be interested in all of your content, so you split it up per topic, so your subscribers can choose which content they want notifications for.

## Setup
How do you make the hubs, endpoint registering and listening registering? <br />
Following [@chris.stephan1996's article on Medium](https://medium.com/@chris.stephan1996/why-when-and-how-and-to-use-signalr-ef49b5b0dc11) with his [Github Repository](https://github.com/chrisstephanrm/SignalRDemo/tree/master).

### Backend
#### Custom Hub
You can just use the Hub class from `Microsoft.aspNetCore.SignalR` and register it in `Program.cs`, however it's likely you need custom functionality for a better developer experience with your SignalR hub.
To make one, simply extend/inherit the `Microsoft.aspNetCore.SignalR.Hub` class like so:
```cs
public class CustomHub : Hub
{
  private const string SEND_MESSAGE_ACTION = "SEND_MESSAGE";

  // There are no methods you need to override
  // You do however have to define your own "action" methods along with the expected parameters from your broadcast event.
  
  public async Task SendMessage(string message) 
  {
    // Notify all clients, who are subscribed to this hub, that SEND_MESSAGE_ACTION has been broadcasted with paramter <message>.
    await Clients.All.SendAsync(SEND_MESSAGE_ACTION, message);
  }
}
```

Alternatively, you can also use the THubClient extension, but I have no idea what it is, however Chris does it [here](https://github.com/chrisstephanrm/SignalRDemo/blob/master/signalr-demo-dotnet/SignalrDemo/SignalrDemo/Signalr/SignalrHub.cs).

The hub should be seen as a service that you inject into your controllers.

#### Registering endpoint to the API
SignalR doesn't need a controller. It does however still need an endpoint, that will be registered in `Program.cs` (where app is defined). In Chris' example, he registers in `StartUp.cs` because project old.

Regardless, you register the endpoint the same:
```cs
app.UseSignalR(routes =>
{
  string endpoint = "/signalr"; // unsure if this is actually the case
  routes.MapHub<CustomHub>(endpoint);
});
```

### Frontend
If you're using a C# framework, then simply use the same NuGet package(?)

However, since I despise C# in frontend, we'll assume your frontend is a Node.js framework (like our best framework, React.js). Chris does his example in Angular, and his implementation can be seen in his [app.component.ts](https://github.com/chrisstephanrm/SignalRDemo/blob/master/signalr-demo-angular/src/app/app.component.ts).

Install NPM package `@aspnet/signalr` as dependency. <br />
Your component should store a HubConnection, which by Chris' example, uses a HubConnectionBuilder to define the HubConnection object.
```ts
const API_SIGNALR_ENDPOINT = 'http://localhost:5000/signalr'; 
this._hubConnection = new HubConnectionBuilder()
  .withUrl(API_SIGNALR_ENDPOINT)
  .configureLogging(LogLevel.Information)
  .build();
```

Once built, the connection should be started and register events that corresponds to the functions defined in the CustomHub service.
```ts
this._hubConnection
  .start()
  .then(() => console.log('Connection started!'))
  .catch(err => console.error('Error while establishing connection', err));

this._hubConnection.on('SendMessage', (message: string) => {
  // Do something with the message parameter i.e. update state
});
```