<template>
  <div class="business-sell-details">
    <fix-header :msg="msg"></fix-header>
    <div class="sell-body">
      <div class="line"></div>
      <div class="details-item">
        <div class="details-item-header">
          <div class="item-header-left">
            <span>2018/12/07 15:29:27</span>
            <span>委托</span>
          </div>
          <div class="item-header-right">
            <span>已成交</span>
          </div>
        </div>
        <div class="details-item-body">
          <div class="item-body-top">
            <div class="entrust-box1">
              <div class="box-title">委托价(EOS)</div>
              <div class="box-data">0.000150</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">委托量(POKER)</div>
              <div class="box-data">64274.6666</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">成交量(POKER)</div>
              <div class="box-data">36.4575</div>
            </div>
          </div>
          <div class="item-body-bottom">
            <div class="entrust-box1">
              <div class="box-title">成交均价(EOS)</div>
              <div class="box-data">0.000150</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">成交总额(EOS)</div>
              <div class="box-data">64274.6666</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">成交总额(EOS)</div>
              <div class="box-data">0.0085</div>
            </div>
          </div>
        </div>
      </div>
      <div class="details-item gray">
        <div class="details-item-header">
          <div class="item-header-left">
            <span>TrxID</span>
            <span
              class="show-address"
            >619e7f0434344d03432434g34535534522619e7f0434344d03432434g34535534522…</span>
          </div>
          <div class="item-header-right">
            <span></span>
          </div>
        </div>
        <div class="details-item-body details-item-body-gray">
          <div class="item-body-top">
            <div class="entrust-box1">
              <div class="box-title">委托价(EOS)</div>
              <div class="box-data">0.000150</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">委托量(POKER)</div>
              <div class="box-data">64274.6666</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">成交量(POKER)</div>
              <div class="box-data">36.4575</div>
            </div>
          </div>
          <div class="item-body-bottom">
            <div class="entrust-box1">
              <div class="box-title">成交对象</div>
              <div class="box-data blue-color">WantLine</div>
            </div>
            <div class="entrust-box2">
              <div class="box-title">成交时间</div>
              <div class="box-data">12/07 15:29</div>
            </div>
            <div class="entrust-box3">
              <div class="box-title">手续费(EOS)</div>
              <div class="box-data">0.0085</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import fixHeader from './components/fixHeader.vue';
export default {
  name: 'business-history-page',
  data() {
    return { msg: '' };
  },
  components: {
    fixHeader,
  },
  methods: {},
  computed: {
    getParams() {
      // 取到路由带过来的参数
      let routerParams = this.$route.params;
      // 将数据放在当前组件的数据内
      this.msg = routerParams;
    },
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: 'getParams',
  },
};
</script>
<style lang="scss" scoped>
@import './../../../style/mixin.scss';
.business-sell-details {
  @include wh(100%, 100%);
}
.sell-body {
  @include wh(100%, 100%);
  margin-top: 0.4rem;
  .line {
    background: rgba(242, 245, 251, 1);
    @include wh(100%, 0.04rem);
  }
  .details-item {
    padding: 0.16rem 0.2rem;
    @include wh(100%, auto);
    display: flex;
    flex-direction: column;
  }
  .gray {
    background-color: rgba(242, 245, 251, 1);
  }
}
.details-item-header,
.details-item-body {
  @include flex(flex, center, space-between);
}
.details-item-header {
  .item-header-left,
  .item-header-right {
    span {
      text-align: left;
      @include font(300, 0.14rem, 0.2rem, 'PingFangSC-Light');
      color: rgba(0, 0, 0, 1);
    }
  }
  .item-header-left {
    width: inherit;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span:nth-child(2) {
      font-weight: 400;
      margin-left: 0.1rem;
    }
    .show-address {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: rgba(0, 122, 255, 1);
    }
  }
  .item-header-right {
    span {
      color: rgba(255, 0, 0, 1);
      text-align: right;
    }
  }
}
.details-item-body-gray {
  border-top: 0.01rem solid rgba(216, 216, 216, 1);
}
.details-item-body {
  @include wh(100%, auto);
  @include flex(flex, center, space-between);
  flex-direction: column;
  margin-top: 0.06rem;
  & > div {
    @include wh(100%, auto);
    margin: 0.1rem 0 0;
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
  .blue-color {
    color: rgba(0, 122, 255, 1);
  }
}
</style>
