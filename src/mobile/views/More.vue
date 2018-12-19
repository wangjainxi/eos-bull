<template>
  <div class="about">
    <h1>This is an about page更多页面</h1>
  </div>
</template>
<script>
import store from '@/store';
export default {
  created() {
    store.commit('setCurrentNum', '5');
  },
};
</script>
