<template>
  <div id="order-tab-container" class="flex-row-start">
    <FilterPopup @onClose="showFilter" v-if="showPopup"/>
    <div class="type-select-box">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <Language resource="business.Open_Orders"/>
        </mt-tab-item>
        <mt-tab-item id="2">
          <Language resource="business.Order_History"/>
        </mt-tab-item>
        <img @click="showFilter" src="@/images/mobile/ic_filter.svg" alt>
      </mt-navbar>
    </div>
    <!-- tab-container -->
    <div class="order-container-box">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <OrderItem
            v-for="order of pendingOrders"
            :key="order.orderId"
            @revoke="handleOrderRevoke"
            :order="order"
          />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <OrderItem v-for="order of historyOrders" :key="order.orderId" :order="order"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import OrderItem from '../../components/order-item.vue';

import FilterPopup from './filter-popup.vue';
import { Order, HistoryOrderParams } from '@/define';
import { cancelOrder } from '@/utils/scatter';

const orderModule = namespace('order');

@Component({
  components: {
    OrderItem,
    FilterPopup,
  },
})
export default class Orders extends Vue {
  @State('accountName')
  accountName!: string;

  @orderModule.Getter('pendingOrders')
  pendingOrders!: Order[];

  @orderModule.State('historyOrders')
  historyOrders!: Order[];

  @orderModule.Action('fetchPendingOrders')
  fetchPendingOrders!: Function;

  @orderModule.Action('fetchHistoryOrders')
  fetchHistoryOrders!: Function;

  @orderModule.Action('cancelOrder')
  cancelOrder!: Function;

  historyParams: HistoryOrderParams = {
    page: 1,
    pageSize: 20,
  };

  showPopup = false;
  selected = '1';

  async created() {
    if (!this.accountName) {
      await this.$store.dispatch('login');
    }
    this.fetchPendingOrders();
    this.fetchHistoryOrders(this.historyParams);
  }

  showFilter() {
    this.showPopup = !this.showPopup;
  }

  handleOrderRevoke(orderId: number) {
    cancelOrder(orderId);
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/mixin.scss';
.mint-tab-item-label {
  font-size: 0.2rem;
}
.type-select-box {
  background-color: #ddd;
  width: 100%;
  position: relative;
  img {
    margin-right: 0.18rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.mint-navbar {
  @include flexLayout(row, space-between, center);
}
.mint-navbar .mint-tab-item {
  flex: 1;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  span {
    font-size: 0.16rem !important;
  }
  .mint-tab-item-label {
    font-size: 0.2rem;
    height: 0.16rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(141, 141, 141, 1);
    line-height: 0.16rem;
    margin-top: 0.14rem;
  }
}
.type-select-box {
  background-color: #fff;
  width: 100%;
  .is-selected {
    color: #007aff;
  }
}

#order-tab-container {
  font-size: 0.16rem !important;
  > div {
    width: 100%;
  }
  @include flexLayout(column, flex-start, flex-start);
  .order-container-box {
    @include flexLayout(column, flex-start, flex-start);
    div {
      width: 100%;
    }
  }
  .mint-navbar {
    height: 0.54rem;
    border-bottom: 0.01rem solid rgba(242, 245, 251, 1);
  }
  .tab-item {
    margin-right: 0.25rem;
    p {
      font-size: 0.14rem;
    }
  }
  .mint-tab-item-label {
    font-size: 0.16rem;
    font-family: PingFangSC-Medium;
    font-weight: 300;
    color: rgba(141, 141, 141, 1);
  }
  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: none;
    .mint-tab-item-label {
      color: rgba(0, 122, 255, 1);
      font-weight: 500;
    }
  }
  .mint-navbar .mint-tab-item.is-selected::after {
    position: absolute;
    content: '';
    height: 0.03rem;
    width: 0.24rem;
    bottom: 0;
    background: #007aff;
    border-radius: 0.02rem;
  }
}
</style>


<style lang="scss" scoped>
@import '@/style/mixin.scss';

.type-select-box {
  background-color: #ddd;
  width: 100%;
  position: relative;
  img {
    margin-right: 0.18rem;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}

.type-select-box {
  background-color: #fff;
  width: 100%;
}
</style>


