import { HubConnectionBuilder, HubConnection, LogLevel } from '@aspnet/signalr';

const socket = new HubConnectionBuilder()
  .withUrl('http://47.52.113.167:5566/feed')
  .configureLogging(LogLevel.Information)
  .build();

socket.on('connect', () => {
  console.log('connect');
});
function s() {
  socket.invoke('UnsubscribeTradeUpdate', 2);
}
socket
  .start()
  .then()
  .catch();

export default socket;
