<template>
  <div class="home">
    <TabTypeContainer/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TabTypeContainer  from '@/components/TabTypeContainer.vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
    TabTypeContainer,
  },
})
export default class Home extends Vue {}
</script>
