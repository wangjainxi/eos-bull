<template>
  <div>
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
