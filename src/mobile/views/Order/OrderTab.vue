<template>
  <div id="order-tab-container" class="flex-row-start">
    <FilterPopup class="filterPopup" @onClose="showFilter" v-if="showPopup"/>
    <div class="type-select-box">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <Language resource="order.Changed_Time"/>
        </mt-tab-item>
        <mt-tab-item id="2">
          <Language resource="order.Entrusted_Time"/>
        </mt-tab-item>
        <img @click="showFilter" src="@/images/mobile/ic_filter.svg" alt>
      </mt-navbar>
    </div>
    <!-- tab-container -->
    <div class="order-container-box">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <OrderItem
            v-for="order of openOrderStore.orders"
            :key="order.orderId"
            :order="order" />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <OrderItem
            v-for="order of historyOrderStore.orders"
            :key="order.orderId"
            :order="order" />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import OrderItem from './order-item.vue';
import FilterPopup from './FilterPopup.vue';
import dataStore from '@/stores/data';
import openOrderStore from '@/stores/open-order';
import historyOrderStore from '@/stores/history-order';

@Observer
@Component({
  components: {
    OrderItem,
    FilterPopup,
  },
})
export default class Orders extends Vue {
  historyOrderStore = historyOrderStore;
  openOrderStore = openOrderStore;
  showPopup = false;
  selected = '1';

  created() {
    openOrderStore.fetchOrders(dataStore.accountName);
    historyOrderStore.setParams({ page: 1 });
    historyOrderStore.fetchMobileOrders(dataStore.accountName);
  }

  showFilter() {
    this.showPopup = !this.showPopup;
  }
}
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.filterPopup {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(31, 31, 31, 0.67);
  z-index: 1000;
  top: 0;
  left: 0;
}
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
.mint-navbar{
  @include flexLayout(row, space-between, center);

}
 .mint-navbar .mint-tab-item {
      flex: 1;
      height: 0.42rem;
      padding: 0px;
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
    content: '1';
    background-color: red;
    color: transparent;
    display: inline-block;
    width: 0.15rem;
    height: 0.03rem;
    background: rgba(0, 122, 255, 1);
    border-radius: 0.03rem;
    margin-top: 0.14rem;
  }
}
</style>


