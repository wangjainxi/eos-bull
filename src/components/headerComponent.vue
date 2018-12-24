<template>
  <div class="headerComponent">
    <div class="h-controller">
      <a class="h-logo" @click="changeLangEvent()">{{$t('m.homepage')}} {{langs}}</a>
      <select v-model="selected" @change="selectPamas">
        <option v-for="option in options" v-bind:value="option.value">{{ option.text }}</option>
      </select>
      <div class="h-search">
        <input type="text" placeholder="音乐/电台/用户">
      </div>
    </div>
    <div></div>
  </div>
</template>
<script lang="ts">
export default {
  computed: {},
  methods: {
    /**
     * 切换语言
     */
    changeLangEvent() {
      //
    },
    selectPamas() {
      //
    },
    created: function created() {
      this.selectPamas();
    },
  },
};
</script>
<style scoped>
</style>

