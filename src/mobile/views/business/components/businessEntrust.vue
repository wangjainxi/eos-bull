<template>
  <div class="entrust-item">
    <div class="entrust-item-head">
      <div class="head-left">
        <div :class="getLangTitle"></div>
        <div class="left-coin-type">{{routeParam.coinName}}</div>
        <div class="left-date">{{Datatime}}</div>
      </div>
      <div :class="['head-right',{canCansel:item.status === 1 || item.status === 2 }]">
        <!-- {{getThisShowTitle}} -->
        <span v-show="item.status === 1 || item.status === 2" @click="canselOrder">{{showWords}}</span>
        <span class="span-green" v-show="item.status === 3 && item.side === 1">{{showWords}}</span>
        <span class="span-red" v-show="item.status === 3 && item.side === 2">{{showWords}}</span>
        <span v-show="item.status === 4">{{showWords}}</span>
        <i v-show="item.status === 3" :class="getGohistory" @click="goHisitory"></i>
      </div>
    </div>
    <div class="entrust-item-body">
      <div class="item-body-top">
        <div class="entrust-box1">
          <div class="box-title">
            <Language resource="business.Order_Price"/>(EOS)
          </div>
          <div class="box-data">{{item.price.amount}}</div>
        </div>
        <div class="entrust-box2">
          <div class="box-title">
            <Language resource="business.Order_VOL"/>(MAX)
          </div>
          <div class="box-data">{{item.size.amount}}</div>
        </div>
        <div class="entrust-box3">
          <div class="box-title">
            <Language resource="business.VOL"/>(MAX)
          </div>
          <div class="box-data">{{item.filled.amount === 0 ? '—' : item.filled.amount}}</div>
        </div>
      </div>
      <div class="item-body-bottom" v-show="entrustType !== 0">
        <div class="entrust-box1">
          <div class="box-title">
            <Language resource="business.AVG_Price"/>(EOS)
          </div>
          <div class="box-data">{{item.avgPrice.amount}}</div>
        </div>
        <div class="entrust-box2">
          <div class="box-title">
            <Language resource="business.Total"/>(EOS)
          </div>
          <div class="box-data">{{item.filledQuote.amount}}</div>
        </div>
        <div class="entrust-box3">
          <div class="box-title">
            <Language resource="business.Fee"/>(EOS)
          </div>
          <div class="box-data">{{item.fees.amount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="tsx">
import { MessageBox } from 'mint-ui';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import languageStore from '@/stores/language';
import { formatTimes } from '@/utils/formatTime';
// import fixHeader from './components/fixHeader.vue';

@Observer
@Component({
  components: {
    // fixHeader,
  },
})
export default class BusinessEntrust extends Vue {
  // name: 'business-entrust-item',
  // props: ['item', 'entrustType'],

  @Prop() item!: any;
  @Prop() entrustType!: number;
  @Prop() routeParam!: any;

  status1: string = languageStore.getIntlText('business.Revoke');
  status2: string = languageStore.getIntlText('business.Dealt');
  status3: string = languageStore.getIntlText('business.Revoked');
  i18n: string = '';
  Datatime = formatTimes(this.item.time, 'MM-DD');
  // methods
  created() {
    const lanS = localStorage.getItem('__language__');
    if (!lanS) return;
    this.i18n = lanS;
  }
  get getLangTitle() {
    let thisString;
    if (this.item.side === 1) {
      //买单
      if (this.i18n === 'zh-CN') {
        thisString = 'left-type zhcn zhcnImg1';
      } else {
        thisString = 'left-type engh enghImg1';
      }
    } else {
      //卖单
      if (this.i18n === 'zh-CN') {
        thisString = 'left-type zhcn zhcnImg2';
      } else {
        thisString = 'left-type engh enghImg2';
      }
    }
    return thisString;
    // <Language resource="business.Buy1"/>:
    // <Language resource="business.Sell1"/>
  }
  get getGohistory() {
    let thisimg;
    if (this.item.side === 1) {
      thisimg = 'getGohistoryImgB';
    } else {
      thisimg = 'getGohistoryImgS';
    }
    return thisimg;
  }
  canselOrder() {
    // MessageBox({
    //   title: "提示",
    //   message: "确定撤销订单?",
    //   showCancelButton: true
    // });
    if (this.entrustType === 0) {
      MessageBox.confirm('确定撤销订单?').then(
        (action: string) => {
          console.log(action);
        },
        (action: string) => {
          console.log(action);
        }
      );
    }
  }
  get showWords() {
    if (this.item.status === 1 || this.item.status === 2) {
      return this.status1;
    } else if (this.item.status === 3) {
      return this.status2;
    } else if (this.item.status === 4) {
      return this.status3;
    }
  }
  goHisitory() {
    this.$router.push({
      path: '/businessHistory',
      name: 'businessHistory',
      params: {
        name: 'business',
        orderId: this.item.orderId,
        tradeItem: this.item,
        ...this.routeParam,
      },
    });
  }
}
</script>
<style lang="scss">
@import '../../../../style/mixin.scss';
.entrust-item {
  padding: 0 0.2rem 0.05rem;
  @include wh(100%, auto);
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 1);
}
.entrust-item-head {
  margin: 0.17rem 0;
  @include flex(flex, center, space-between);
}
.head-left {
  @include flex(flex, center, space-between);
  .left-type {
    @include flex(flex, center, center);
    @include wh(0.15rem, 0.15rem);
    @include font(400, 0.09rem, 0.13rem, 'PingFangSC-Regular');
    color: rgba(255, 255, 255, 1);
  }
  .engh {
    @include wh(0.26rem, 0.13rem);
  }
  .zhcnImg1 {
    @include bis('./../../../../images/mobile/ic_buy_c.svg');
  }
  .zhcnImg2 {
    @include bis('./../../../../images/mobile/ic_sell_c.svg');
  }
  .engh.enghImg1 {
    @include bis('./../../../../images/mobile/ic_buy_e.svg');
  }
  .engh.enghImg2 {
    @include bis('./../../../../images/mobile/ic_sell_e.svg');
  }
  .left-type.sell {
    background: rgba(255, 0, 0, 1);
  }
  .left-coin-type {
    margin: 0 0.06rem;
    color: rgba(0, 0, 0, 1);
    @include font(400, 0.16rem, 0.22rem, 'PingFangSC-Regular');
  }
  .left-date {
    @include font(300, 0.12rem, 0.17rem, 'PingFangSC-Regular');
    color: rgba(102, 102, 102, 1);
  }
}
.head-right {
  @include flex(flex, flex-end, space-between);
  span {
    @include flex(flex, center, center);
    color: rgba(102, 102, 102, 1);
    @include font(300, 0.14rem, 0.2rem, 'PingFangSC-Regular');
  }
  span.span-green {
    color: rgba(7, 199, 78, 1);
  }
  span.span-red {
    color: rgba(255, 0, 0, 1);
  }
  & > i {
    margin-left: 0.04rem;
    @include wh(0.2rem, 0.2rem);
  }
  i.getGohistoryImgB {
    @include bis('./../../../../images/mobile/ic_arrow_right_green.svg');
  }
  i.getGohistoryImgS {
    @include bis('./../../../../images/mobile/ic_arrow_right_red.svg');
  }
}
.head-right.canCansel {
  span {
    background: rgba(0, 122, 255, 1);
    @include borderRadius(3px);
    // @include wh(0.42rem, 0.22rem);
    height: 0.22rem;
    padding: 0 0.05rem;
    color: rgba(255, 255, 255, 1);
  }
}
.entrust-item-body {
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid rgba(242, 245, 251, 1);
  & > div {
    margin-bottom: 0.1rem;
    @include flex(flex, center, space-between);
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
  .entrust-box1 {
    & > div {
      text-align: left;
    }
  }
  .entrust-box3 {
    & > div {
      text-align: right;
    }
  }
  .box-title {
    color: rgba(102, 102, 102, 1);
    @include font(300, 0.12rem, 0.17rem, 'PingFangSC-Light');
  }
  .box-data {
    margin-top: 0.02rem;
    @include font(500, 0.14rem, 0.2rem, 'PingFangSC-Medium');
    color: rgba(0, 0, 0, 1);
  }
}
</style>
