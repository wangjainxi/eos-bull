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
html,
body {
  height: 100vh;
  width: 100vw;
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
</style>
