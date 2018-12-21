<template>
  <input v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class extends Vue {}
</script>

<style lang="scss">
</style>