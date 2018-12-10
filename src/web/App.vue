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
import Top from "./components/header.vue";
import Foot from "./components/footer";
export default {
  name: "app",
  components: {
    Top,
    Foot
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0;
  padding: 0;
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
  .outermost-mex-body-page {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
