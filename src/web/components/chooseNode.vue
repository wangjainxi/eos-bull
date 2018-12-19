<template>
  <div class="choose-node">
    <div class="node-title">Current Node</div>
    <el-popover placement="bottom-start" width="680" trigger="click" :value="showFlag">
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
          <img :src="showFlag ? '@/images/web/ic_arrow_up.svg' : '@/images/web/ic_arrow_down.svg'" alt>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'choose-node',
  data() {
    return {
      showFlag: false,
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    };
  },
  props: [],
  methods: {
    changePopUp() {
      this.showFlag = ! this.showFlag;
    },
  },
};
</script>
<style lang="scss">
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
    background: rgba(13, 31, 53, 1);
    border: 1px solid rgba(30, 58, 93, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    .green {
      color: rgba(28, 196, 102, 1);
    }
    .red {
      color: rgba(229, 55, 87, 1);
    }
    .yellow {
      color: rgba(246, 194, 68, 1);
    }
    & > div {
      img {
        width: 10px;
        height: 6px;
        margin-left: 14px;
      }
    }
  }
}
</style>
