<template>
  <div class="market-view-box">
      <TopView/>
      <!-- <div class="trading-box">trading view</div> -->
      <BomView/>
  </div>
</template>
<script>
import TopView from './TopView';
import BomView from './BomView'
export default {
  name: "market-view",
  components:{
    TopView,
    BomView
  }
};
</script>
<style lang="scss">
@import '../../../../style/mixin.scss';

.green-color {
  color: rgba(7, 199, 78, 1);
}
.red-color {
  color: rgba(229, 55, 87, 1);
}
.market-view-box {
  @include flexLayout(column,flex-start,flex-start);
  width: 100%;
  .trading-box{
    height: 43rem;
  }
}
</style>


