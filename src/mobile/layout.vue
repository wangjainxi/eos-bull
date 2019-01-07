<template>
  <div class="tab-package-box">
    <transition
      mode="out-in"
      :duration="500"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view/>
    </transition>
    <Tabbar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tabbar from './components/tabbar.vue';

@Component({
  components: {
    Tabbar,
  },
})
export default class Layout extends Vue {}
</script>

<style lang="scss">
.tab-package-box {
  width: 100%;
  height: 100%;
}
</style>
