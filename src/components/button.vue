<template>
  <div id="button-box">
    <button
      :class="[type==='sell38'? 'sell38':'',type==='buy38'? 'buy38':'']"
      @click="onclick"
    >{{text}}</button>
  </div>
</template>
<script>
export default {
  name: "button",
  props: {
    type: {
      type: String
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    onclick: function() {
      this.$emit("onclick");
    }
  }
};
</script>
<style lang="scss">
#id {
  display: inline-block;
  .sell38 {
    height: 38px;
    background: rgba(255, 0, 0, 1);
    border-radius: 2px;
  }
  .buy38 {
    height: 38px;
    background: rgba(7, 199, 78, 1);
    border-radius: 2px;
  }
  button {
    color: #fff;
    border: none;
    outline: none;
    width: 100%;
  }
}
</style>



