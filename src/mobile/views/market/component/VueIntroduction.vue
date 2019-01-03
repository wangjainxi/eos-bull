<template>
  <div class="intro-box" v-if="tokenInfo">
    <div class="intro-top">
      <div class="name-box">
        <img class="icon" :src="tokenInfo.icon" />
        <div class="name">{{ tokenInfo.symbol.name }}</div>
      </div>
      <p class="introduction">{{ tokenInfo.introduction }}</p>
    </div>
    <div class="intro-bom">
      <p class="base-info">
        <Language resource="asset.Introduction" />
      </p>
      <p class="info-title">
        <span>
          <Language resource="asset.Circulating_Supply" />
        </span>
        <span>
          {{ tokenInfo.circulatingSupply.amount }}
          {{ tokenInfo.circulatingSupply.symbol.name }}
        </span>
      </p>
      <p class="info-title">
        <span>
          <Language resource="asset.Max_Supply" />
        </span>
        <span>
          {{ tokenInfo.maxSupply.amount }}
          {{ tokenInfo.maxSupply.symbol.name }}
        </span>
      </p>
      <p class="info-title">
        <span>
          <Language resource="asset.Contract" />
        </span>
        <span>
          {{ tokenInfo.contract }}
        </span>
      </p>
      <p class="info-title">
        <Language resource="asset.Website" />
        <a :href="tokenInfo.website">{{ tokenInfo.website }}</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TokenInfo } from '@/define';

@Component
export default class Introduction extends Vue {
  @Prop()
  tokenInfo?: TokenInfo;
}
</script>
<style lang="scss" scoped>
@import '@/style/mixin.scss';

.name-box {
  margin-bottom: 0.12rem;
  display: flex;
  align-items: center;
}

.icon {
  height: 0.26rem;
  width: 0.26rem;
  margin-right: 0.04rem;
}

.name {
  font-size: 0.17rem;
  font-weight: bold;
}

.introduction {
  color: #8D8D8D;
  font-size: 0.14rem;
}

.intro-box {
  width: 100%;
  padding: 0.13rem 0.2rem 0.31rem 0.2rem;
  .hidden {
    color: transparent;
    font-size: 12px;
  }
  .intro-bom {
    padding-top: 0.13rem;
    @include flexLayout(column, flex-start, flex-start);
    .base-info {
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 0.08rem;
    }
    .info-title {
      height: 0.22rem;
      line-height: 0.22rem;
      > span:nth-child(1) {
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(141, 141, 141, 1);
        margin-right: 0.14rem;
      }

      > span:nth-child(2) {
        font-size: 12px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
      }
    }
  }
}
</style>

