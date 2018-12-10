<template>
  <div class="home">
    <HeaderComponent/>
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import HeaderComponent from "@/components/headerComponent.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    HeaderComponent
  }
})
export default class Home extends Vue {}
</script>
