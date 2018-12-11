<template>
  <div class="tab-type-box flex-row-start">
     <router-link to="/"><span>首页</span></router-link>
     <router-link to="/market"><span>行情</span></router-link>
     <router-link to="/orders"><span>订单</span></router-link>
     <router-link to="/assets"><span>资产</span></router-link>
     <router-link to="/more"><span>更多</span></router-link>
  </div>
</template>
<script>
export default {
  name:'tab-type-container'
}
</script>

<style lang="scss">
  .tab-type-box{
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    background-color: #ddd;
    span{
      width: 70px;
      display: flex;
      flex: 1;
    }
  }
</style>

