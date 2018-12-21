import { observable, action } from 'mobx';
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

class UserStore {
  @observable
  currency = 'BTC';
  account = 'admin';
  marketId = 1;
  socket: any;

  @action.bound
  setCurrency(currency: string) {
    this.currency = currency;
  }

  @action
  getData() {
    // socket.on('tradeUpdate', (msg: any) => {
    //   console.log(msg);
    // });
    const socket = new HubConnectionBuilder()
      .withUrl('http://47.52.113.167:5566/feed' || '')
      .configureLogging(LogLevel.Information)
      .build();

    socket.on('connect', (msg: any) => {
      console.log(msg);
    });
    this.socket = socket;
    const socketLogin = () => {
      const res = socket.invoke('SubscribeL2update', 1);
      console.log(res);
    };
    socket.on('ReceiveMessage', (user, msg) => {
      console.log(user);
    });
    // socket.invoke('l2update', 'user', 'message').catch(err => console.error(err.toString()));
    socket.on('l2update', (user, msg) => {
      // console.log(user);
    });
    socket
      .start()
      .then(socketLogin)
      .catch((err: any) => {
        console.error(err.toString());
      });
    async function start() {
      try {
        await socket.start();
        console.log('connected');
      } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
      }
    }

    socket.onclose(async () => {
      await start();
    });
  }
}

export default new UserStore();
