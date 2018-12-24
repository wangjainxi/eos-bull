<template>
  <div class="choose-node">
    <div class="node-title">
      <Language resource="myWallet.Current_Node"/>
    </div>
    <!-- <el-popover placement="bottom-start" width="680" trigger="click" :value="showFlag">
      <el-table :data="gridData">
        <el-table-column width="150" property="date" label="日期"></el-table-column>
        <el-table-column width="100" property="name" label="姓名"></el-table-column>
        <el-table-column width="300" property="address" label="地址"></el-table-column>
      </el-table>
      <div class="current-node" slot="reference" @click="changePopUp">
        <div>https://eos.newdex.i</div>
        <div>Hongkong, HK</div>
        <div class="green">195ms Low Latency</div>
        <div>
          <span>EOS Main</span>
          <img
            :src="showFlag ? '@/images/web/ic_arrow_up.svg' : '@/images/web/ic_arrow_down.svg'"
            alt
          >
        </div>
      </div>
    </el-popover>-->
    <el-select popper-class="current-node" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="getShowOptionVal(item.label, item.name, item.website,item.address)"
        :value="item.value"
      >
        <div :class="value === item.value ?'show-select-item bacolor': 'show-select-item'">
          <div>{{item.label}}</div>
          <div>{{item.address}}</div>
          <div :class="changeColor(item.type)">{{item.website}}</div>
          <div>
            <span>{{item.name}}</span>
            <i :class="value === item.value ? 'el-icon-check' : ''"></i>
          </div>
        </div>
      </el-option>
    </el-select>
    <div class="show-change" v-show="propsVal !== value">
      <Language resource="myWallet.Are_node"/>
      <div class="show-botton">
        <button>
          <Language resource="myWallet.Cancel"/>
        </button>
        <button>
          <Language resource="myWallet.OK"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const option = [
  {
    value: 1,
    label: 'https://eos.newdex.i',
    address: 'Hongkong, HK',
    website: '195ms Low Latency',
    name: 'EOS Main',
    type: 0,
  },
  {
    value: 2,
    label: 'https://api.eosnewyork.io',
    address: 'California, US',
    website: '195ms Low Latency',
    name: 'EOS Main',
    type: 0,
  },
  {
    value: 3,
    label: 'https://api.bp.fish',
    address: 'Hong Kong, CN',
    website: '195ms Low Latency',
    name: 'EOS Main',
    type: 0,
  },
  {
    value: 4,
    label: 'https://nodes.eos42.io',
    address: 'London, UK',
    website: 'Timed Out',
    name: 'EOS Main',
    type: 1,
  },
  {
    value: 5,
    label: 'https://eos.greymass.com',
    address: 'Quebec, CA',
    website: '300ms Low Latency',
    name: 'EOS Main',
    type: 2,
  },
];

@Component
export default class ChooseNode extends Vue {
  // data
  showFlag: boolean = false;
  value: number = 1;
  propsVal: number = 1;
  options: Array<any> = option;
  // props: ['propVal'],
  // methods
  changePopUp() {
    this.showFlag = !this.showFlag;
  }
  changeColor(obj: number) {
    if (obj === 0) {
      return 'green';
    } else if (obj === 1) {
      return 'red';
    } else if (obj === 2) {
      return 'yellow';
    }
  }
  getShowOptionVal(label: string, name: string, website: string, address: string) {
    // const h: any = this.$createElement;
    // return h('p', '', [h('span', '', '内容可以是 '), h('i', { style: 'color: teal' }, label)]);
    return `${label}             ${address}                ${website}             ${name}   `;
  }
}
</script>
<style lang="scss" scoped>
@import './../../style/mixin.scss';
.choose-node {
  margin: 0 60px;
  .node-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(110, 132, 163, 1);
    margin: 20px 0 5px;
  }
  .current-node {
    @include wh(100%, 60px);
    @include flex(flex, center, space-between);
    padding: 0 20px;
    border: 1px solid rgba(30, 58, 93, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    & > div:nth-child(3) {
      color: rgba(28, 196, 102, 1);
    }
    & > div {
      i {
        width: 10px;
        height: 6px;
        margin-left: 14px;
        font-size: 16px;
        color: rgba(28, 196, 102, 1);
      }
    }
  }
  .el-select {
    width: 680px;
    .el-input__inner {
      border: none;
      background: rgba(13, 31, 53, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .show-change {
    margin: 30px auto 50px;
    display: flex;
    @include flex(flex, center, center);
    flex-direction: column;
    span {
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(146, 167, 197, 1);
    }
    .show-botton {
      display: flex;
      button {
        @include flex(flex, center, center);
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        margin: 30px 5px 0;
        color: rgba(146, 167, 197, 1);
        background: transparent;
        cursor: pointer;
        border: 1px solid rgba(110, 132, 163, 1);
      }
      & > button:nth-child(2) {
        color: rgba(255, 255, 255, 1);
        border: none;
        background: rgba(45, 123, 229, 1);
      }
    }
  }
}
</style>
