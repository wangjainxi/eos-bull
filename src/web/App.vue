<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import './element-variables.scss';

export default {
  name: 'app',
};
</script>

<style lang="scss">
html {
  font-family: 'PingFang SC', 'Microsoft Yahei';
}

html,
body {
  height: 100vh;
  width: 100vw;
}
body,
div,
html,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  font-weight: normal;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  &:hover {
    outline: none;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
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
.el-slider__stop {
  height: 13px;
  width: 13px;
  transform: translate(-50%, -50%);
  top: 50%;
  border: solid 2px #2d7be5;
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
#myWallet {
  .assets-th-right {
    .el-input {
      input {
        border-radius: 20px;
        border: 1px solid rgba(36, 65, 102, 1);
      }
    }
  }
  .el-input {
    height: 38px;
    background: rgba(20, 46, 77, 1);
    input {
      border: none;
      background: rgba(20, 46, 77, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(110, 132, 163, 1);
    }
  }
  .el-table th {
    padding: 7px 0;
  }
  .el-table td:nth-child(1) {
    .cell {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
        margin-right: 13px;
      }
    }
  }
  .el-table th:nth-child(6) {
    display: flex;
    & > .cell {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      i {
        margin: 0 5px 0 55px;
        cursor: pointer;
      }
    }
  }
}
.current-node {
  width: 680px;
  border: none;
  .show-select-item {
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    .green {
      color: rgba(28, 196, 102, 1);
    }
    & > div:nth-child(1) {
      width: 36%;
    }
    & > div:nth-child(3) {
      width: 27%;
    }
    & > div:nth-child(4) {
      width: 15%;
      display: flex;
      align-items: baseline;
    }
    & > div {
      width: 22%;
      i {
        width: 10px;
        height: 6px;
        margin-left: 14px;
        font-size: 16px;
        color: rgba(28, 196, 102, 1);
      }
    }
  }
  .bacolor {
    color: rgba(255, 255, 255, 1);
    background-color: #142e4d;
  }
  .el-select-dropdown__item {
    padding: 0 !important;
  }
  .red {
    color: rgba(229, 55, 87, 1) !important;
  }
  .yellow {
    color: rgba(246, 194, 68, 1) !important;
  }
}
</style>
