<template>
  <div class="headerComponent">
      <div class="h-controller">
          <a  class="h-logo" @click="changeLangEvent()">
            {{$t('m.homepage')}} {{langs}}
          </a>
    <select v-model="selected" @change="selectPamas">
             <option v-for="option in options" v-bind:value="option.value">
               {{ option.text }}
             </option>
   </select>
          <div class="h-search">
              <input type="text" placeholder="音乐/电台/用户">
          </div>
      </div>
      <div>
      </div>
  </div>
</template>
<script>
export default {

  computed:{
    langs:function(){
     return this.$store.getters.getLanguage;
    }
  },
  methods: {
    /**
     * 切换语言
     */
    changeLangEvent() {
      if (this.lang === "zh-CN") {
        this.lang = "en-US";
        this.$i18n.locale = this.lang;
      } else {
        this.lang = "zh-CN";
        this.$i18n.locale = this.lang;
      }
    },
    selectPamas() {
      console.log(this.$store.state.language.language);
      this.$store.dispatch('onSetLanguage',this.lang);
       if (this.selected === "english") {
        this.lang = "en-US";
        this.$i18n.locale = this.lang;
      } else {
        this.lang = "zh-CN";
        this.$i18n.locale = this.lang;
      }
    },
    created:function created(){
      this.selectPamas();
    }
  },
};
</script>
<style scoped>

</style>

