import { Order } from '@/define';

export interface OrderState {
  pendingOrders: Order[];
  historyOrders: Order[];
  historyOrderCount: number;
}
