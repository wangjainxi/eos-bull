<template>
  <div id="home-list-box">
    <div class="home-list-name-box">
      <h4>{{item.currency}}/EOS</h4>
      <p>24小时成交量 {{item.dealSize}}</p>
    </div>
    <div class="home-list-price-box">
      <h4>{{item.price}}</h4>
      <p v-if="item.statu === 1" class="rise">+{{item.statu}}%</p>
      <p v-else-if="item.statu === 2" class="fall">-{{item.statu}}%</p>
      <p v-else>0.00%</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "list-child",
  props: ["item"]
};
</script>

<style lang="scss">
#home-list-box {
  display: flex;
  justify-content: space-between;
  height: 0.6rem;
  border-bottom: 1px solid #f2f5fb;
  align-items: center;
  .home-list-name-box {
    text-align: left;
    h4 {
      font-size: 0.16rem;
      color: #000;
    }
    p {
      font-size: 0.1rem;
      color: #666;
    }
  }
  .home-list-price-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > h4 {
      font-size: 0.14rem;
      color: #000;
      font-weight: bold;
      margin-right: 0.2rem;
    }
    > p {
      width: 0.77rem;
      height: 0.29rem;
      background: #9a9a9a;
      color: #ffffff;
      border-radius: 0.03rem;
      line-height: 0.29rem;
    }
    > .fall {
      background: #ff0000;
    }
    > .rise {
      background: #07c74e;
    }
  }
}
</style>
