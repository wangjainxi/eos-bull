<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script  lang="ts">
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './../style/common.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  display: block;
  background: #fff;
}

.flex-row-start {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.flex-row-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.flex-row-between-center {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-column-start-start {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.is-selected {
  span {
    font-family: PingFangSC-Medium;
    font-weight: bold !important;
  }
}
</style>
