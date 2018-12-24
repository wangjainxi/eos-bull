import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
console.log(process.env);
const socket = new HubConnectionBuilder()
  .withUrl(process.env.VUE_APP_SOCKET_URL)
  .configureLogging(LogLevel.Information)
  .build();

socket.on('connect', () => {
  console.log('connected');
});

export default socket;
