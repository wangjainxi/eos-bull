<template>
  <div>
    <Top/>
    <div class="outermost-mex-body">
      <div class="outermost-mex-body-page">
        <router-view/>
      </div>
    </div>
    <Foot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Top from './components/header.vue';
import Foot from './components/footer.vue';
@Component({
  components: {
    Top,
    Foot,
  },
})
export default class WebPackage extends Vue {}
</script>
<style lang="scss">
.outermost-mex-body {
  background: #0d1f35;
  .outermost-mex-body-page {
    width: 1200px;
    margin: 0 auto;
    min-height: 800px;
  }
}
</style>
