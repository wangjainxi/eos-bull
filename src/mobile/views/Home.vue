<template>
  <div class="home">
    <tab-type-container/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TabTypeContainer from "@/components/TabTypeContainer.vue";

@Component({
  components: {
    TabTypeContainer
  }
})
export default class Home extends Vue {}
</script>
