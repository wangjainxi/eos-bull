import { observable } from 'mobx';
import { Order } from '@/define';

class DataStore {
  @observable
  accountName = 'user1';
}

const dataStore = new DataStore();

export default dataStore;
