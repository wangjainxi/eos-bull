<template>
  <div class="tab-type-box flex-row-start">
    <div @click="setCurrentNum('1')">
      <router-link to="/" v-if="count.currency === '1'">
        <img src="@/images/mobile/ic_nav_assets_press.svg" alt>
        <p class="special">
          <Language resource="foot.Homepage"/>
        </p>
      </router-link>
      <router-link to="/" v-else>
        <img src="@/images/mobile/ic_nav_assets_normal.svg" alt>
        <p>
          <Language resource="foot.Homepage"/>
        </p>
      </router-link>
    </div>
    <div @click="setCurrentNum('2')">
      <router-link to="/market" v-if="count.currency === '2'">
        <img src="@/images/mobile/ic_nav_home_press.svg" alt>
        <p class="special">
          <Language resource="foot.Markets"/>
        </p>
      </router-link>
      <router-link to="/market" v-else>
        <img src="@/images/mobile/ic_nav_home_normal.svg" alt>
        <p>
          <Language resource="foot.Markets"/>
        </p>
      </router-link>
    </div>

    <div @click="setCurrentNum('3')">
      <router-link to="/orders" v-if="count.currency === '3'">
        <img src="@/images/mobile/ic_nav_more_press.svg" alt>
        <p class="special">
          <Language resource="foot.Order"/>
        </p>
      </router-link>
      <router-link to="/orders" v-else>
        <img src="@/images/mobile/ic_nav_more_normal.svg" alt>
        <p>
          <Language resource="foot.Order"/>
        </p>
      </router-link>
    </div>

    <div @click="setCurrentNum('4')">
      <router-link to="/assets" v-if="count.currency === '4'">
        <img src="@/images/mobile/ic_nav_order_press.svg" alt>
        <p class="special">
          <Language resource="foot.Asser"/>
        </p>
      </router-link>
      <router-link to="/assets" v-else>
        <img src="@/images/mobile/ic_nav_order_normal.svg" alt>
        <p>
          <Language resource="foot.Asser"/>
        </p>
      </router-link>
    </div>

    <div @click="setCurrentNum('5')">
      <router-link to="/more" v-if="count.currency === '5'">
        <img src="@/images/mobile/ic_nav_quotes_press.svg" alt>
        <p class="special">
          <Language resource="foot.More"/>
        </p>
      </router-link>
      <router-link to="/more" v-else>
        <img src="@/images/mobile/ic_nav_quotes_normal.svg" alt>
        <p>
          <Language resource="foot.More"/>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import userStore from '@/stores/user';
import { Observer } from 'mobx-vue';

@Observer
@Component
export default class TabPackage extends Vue {
  count = userStore;
  setCurrentNum(num: string) {
    userStore.setCurrency(num);
  }
  created() {
    console.log(userStore);
  }
}
</script>

<style lang="scss">
.tab-type-box {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0.5rem;
  border-top: 1px solid #f2f5fb;
  background: #fff;
  z-index: 1000;
  > div {
    display: flex;
    width: 20%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 0.1rem;
    img {
      display: inline-block;
    }
    p {
      font-size: 0.1rem;
      padding-bottom: 2px;
      color: #b3bfd0;
    }
  }
  .special {
    color: #007aff;
  }
}
</style>

