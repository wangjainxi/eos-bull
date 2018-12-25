import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

const callArr = [];

const socket = new HubConnectionBuilder()
  .withUrl(process.env.VUE_APP_SOCKET_URL)
  .configureLogging(LogLevel.Information)
  .build();

const start = () => {
  socket
    .start()
    .then(() => {
      socket.invoke('SubscribeTickerUpdate');
    })
    .catch(start);
};

socket.onclose(async () => {
  await start();
});

start();

export default socket;
