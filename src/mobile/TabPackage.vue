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
    <mobile-tabs/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MobileTabs from './components/mobileTabs.vue';

@Component({
  components: {
    MobileTabs,
  },
})
export default class TabPackage extends Vue {}
</script>

<style lang="scss">
.tab-package-box {
  width: 100%;
  height: 100%;
}
</style>
