import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

const socket = new HubConnectionBuilder()
  .withUrl(process.env.SOCKET_URL)
  .configureLogging(LogLevel.Information)
  .build();

socket.on('connect', () => {
  console.log('connected');
});

socket
  .start()
  .then()
  .catch();

export default socket;
