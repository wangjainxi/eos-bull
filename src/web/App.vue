<template>
  <div id="app">
    <top></top>
    <div class="outermost-mex-body">
      <div class="outermost-mex-body-page">
        <router-view/>
      </div>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import Top from './components/header.vue';
import Foot from './components/footer';
import './element-variables.scss';
export default {
  name: 'app',
  components: {
    Top,
    Foot,
  },
};
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  outline: none;
  color: #ddd;
}
input::-webkit-input-placeholder {
  color: #ddd;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
.el-table th,
.el-table tr,
.el-table {
  background: none;
  color: #ddd;
}
.el-table .cell {
  padding-left: 23px;
  font-size: 12px;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #1e3a5d;
}
.el-table::before {
  display: none;
}
.el-table__header {
  background: #12263f;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #12263f;
}
.el-table th {
  padding: 15px 0;
}
.el-table th > .cell {
  font-size: 12px;
  color: #6e84a3;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.outermost-mex-body {
  background: #0d1f35;
  height: 100%;
  .outermost-mex-body-page {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
  }
}
.my-wallet-model {
  width: 850px !important;
  padding: 0 !important;
  border: none !important;
  background: linear-gradient(
    135deg,
    rgba(14, 106, 190, 1) 0%,
    rgba(14, 80, 175, 1) 100%
  ) !important;
  .el-message-box__content {
    padding: 0 !important;
  }
  .el-message-box__btns {
    padding: 0 !important;
  }
  .el-message-box__title {
    span {
      display: inline-block;
      width: 125px;
      margin-left: 25px;
      height: 36px;
      background-image: url(./../images/logo_eosmex_white.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .el-message-box__headerbtn .el-message-box__close {
    color: #e26565;
  }
}
.foot-choose-node {
  width: 800px !important;
  border: none !important;
  background: #142e4d !important;
  .el-message-box__headerbtn .el-message-box__close {
    color: #e26565;
  }
  .el-message-box__header {
    border-bottom: 1px solid rgba(30, 58, 93, 1);
  }
  .el-message-box__content {
    padding: 0 !important;
  }
  .el-message-box__title {
    span {
      font-size: 18px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
