<template>
  <div class="about">
    <h1>This is an about page更多页面</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import userStore from '@/stores/user';

@Component
export default class extends Vue {
  created() {
    userStore.setCurrency('5');
  }
}
</script>
