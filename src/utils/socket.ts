import onfire from 'onfire.js';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { PriceLevelUpdate, TickerUpdate, Trade, BalanceUpdate, Order } from '@/define';

const socket = new HubConnectionBuilder()
  .withUrl(process.env.VUE_APP_SOCKET_URL)
  .configureLogging(LogLevel.Information)
  .build();

socket.on('l2update', (data: PriceLevelUpdate) => {
  onfire.fire('l2update', data);
});

socket.on('tickerUpdate', (data: TickerUpdate) => {
  onfire.fire('tickerUpdate', data);
});

socket.on('tradeUpdate', (data: Trade) => {
  onfire.fire('tradeUpdate', data);
});

socket.on('balanceUpdate', (data: BalanceUpdate) => {
  onfire.fire('balanceUpdate', data);
});

socket.on('orderUpdate', (data: Order) => {
  onfire.fire('orderUpdate', data);
});

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
