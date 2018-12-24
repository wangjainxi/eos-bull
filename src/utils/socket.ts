import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
console.log(process.env);
const socket = new HubConnectionBuilder()
  .withUrl(process.env.VUE_APP_URL + '/feed')
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
