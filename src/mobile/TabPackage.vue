<template>
  <div class="tab-package-box">
    <router-view/>
    <tab-type-container/>
  </div>
</template>

<script lang="ts">
import TabTypeContainer from "@/components/TabTypeContainer.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    TabTypeContainer
  }
})
export default class TabPackage extends Vue {}
</script>
<style lang="scss">
.tab-package-box {
  width: 100%;
  height: 100%;
}
</style>
