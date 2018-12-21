<template>
  <div class="tab-package-box">
    <router-view/>
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
export default class TabPackage extends Vue {
  created() {
    console.log(MobileTabs);
  }
}
</script>

<style lang="scss">
.tab-package-box {
  width: 100%;
  height: 100%;
}
</style>
