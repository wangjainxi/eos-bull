<template>
  <div id="roportPage">
    <div class="banner-box">
      <div class="report-inner-box">
        <button v-if="status === '1'" class="report-button">
          <span>立即报名</span>
        </button>
        <div :class="status==='3'?'actionTip':'action'">
          <p @click="onViewRules">活动规则</p>
          <p>签到日历</p>
          <p v-if="status ==='3'">短信提醒</p>
        </div>
        <img src="@/images/mobile/report/out.svg" class="outIcon" alt>
      </div>
    </div>
    <div class="info-box-package">
      <h4 class="title">奖池</h4>
      <div class="info">
        <div class="info-box">
          <p>奖池总额</p>
          <p>3405.4323 EOS</p>
        </div>
        <div class="info-box">
          <p>坚持人数</p>
          <p>4324</p>
        </div>
      </div>
      <div class="info infoTwo">
        <div class="info-box">
          <p>参与份数</p>
          <p>43255</p>
        </div>
        <div class="info-box">
          <p>每份奖励</p>
          <p>4324</p>
        </div>
      </div>
      <h4 class="title">我的</h4>
      <div class="info">
        <div class="info-box">
          <p>参与份数</p>
          <p>43255</p>
        </div>
        <div class="info-box">
          <p>预期奖励</p>
          <p>4324 EOS</p>
        </div>
      </div>
    </div>
    <div class="rules-box-package" id="rulesElement">
      <h4 class="title">活动规则</h4>
      <div class="rules-text-box">
        <h5>奖池组成：</h5>
        <p>基础奖池10000 EOS+30天内交易手续费的30%+全部参与用户投入EOS总量。</p>
        <h5>参与条件：</h5>
        <p>报名1 EOS／人次，所有报名费用将投入挑战基金，最高100人次封顶（基础奖池设有10000 EOS，参与人次越多，赢取奖金越多）。</p>
        <h5>交易打卡：</h5>
        <p>自挑战日起，连续30天每天8:00-18:00（北京时间）在EOSmex交易所任意交易对成功进行交易，且每日交易额度≥1EOS则视为挑战成功。</p>
        <h5>奖励分配：</h5>
        <p>结算完成后，挑战成功用户将按照投入人次平分当期的总奖励，奖励金将自动转入用户对应的EOS账号。</p>
        <h5>出局说明：</h5>
        <p>用户在挑战期间任意一天没有交易，或交易额度不足1EOS，即算出局，投入的挑战EOS将不再返还，此EOS将会分配给挑战成功的用户。</p>
        <h5>活动须知：</h5>
        <p>连续30日打卡，请使用同一EOS账号进行交易，否则将视为出局；
          <br>当期挑战计划结束后，挑战失败的用户将被扣除挑战的 EOS，作挑战奖励金；
          <br>当期挑战计划结束后，挑战成功的用户将获得挑战奖励金，作为激励；
          <br>用户交易打卡时，所有交易记录均由链上合约执行，保证公平公开；
          <br>Eosmex提倡公平竞争，作弊行为将取消挑战资格。 请在交易打卡时，确保Eosmex的稳定运行环境。
        </p>
        <h5>举个栗子：</h5>
        <p>活动截止共885人报名了3040份；
          <br>总奖池共：10000（基础奖池）+3040 EOS（报名费用）+2400（交易手续费奖励）；
          <br>梭哈老头，梭哈参与了10份，并在30天每天按规则进行了交易，活动结束时包含梭哈老头共有530人挑战成功，530人共计持有680份；
          <br>梭哈老头将分到奖池(10000+3040+2400)/680*10=227.0588 EOS。
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class ReportActivety extends Vue {
  status = '1';
  onViewRules() {
    const rulesElement = document.getElementById('rulesElement');
    const roportPage = document.getElementById('roportPage');

    if (rulesElement === null || roportPage === null) return;
    const rulesElementTop = rulesElement.offsetTop;
    roportPage.scrollTop = rulesElementTop;
  }
}
</script>
<style lang="scss" scoped>
#roportPage {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.banner-box {
  width: 100%;
  height: 1.7rem;
  position: relative;
  background: url('../../../images/mobile/report/report_activity_banner.svg') no-repeat;
  background-size: cover;
  position: relative;
  .outIcon {
    position: absolute;
    bottom: -0.3rem;
    right: 0.59rem;
  }
  .report-inner-box {
    padding-top: 1rem;
    text-align: right;

    .report-button {
      width: 0.96rem;
      height: 0.22rem;
      background: #fbd92a;
      margin-bottom: 0.12rem;
      margin-right: 0.56rem;
      span {
        font-size: 0.12rem;
      }
    }
    .action {
      display: flex;
      justify-content: flex-end;
      p {
        font-size: 0.12rem;
        color: #007aff;
        margin-right: 0.16rem;
      }
      p:last-child {
        margin-right: 0.5rem;
      }
    }
    .actionTip {
      display: flex;
      justify-content: flex-end;
      margin-top: 0.1rem;
      p {
        font-size: 0.12rem;
        color: #007aff;
        margin-right: 0.16rem;
      }
      p:last-child {
        margin-right: 0.2rem;
      }
    }
  }
}
.title {
  color: #fff;
  font-size: 0.2rem;
  margin-bottom: 0.2rem;
}
.info-box-package {
  padding: 0.3rem 0.45rem 0.1rem;
  background: #191a2a;

  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
  .infoTwo {
    margin-bottom: 0.3rem;
  }
  .info-box {
    width: 50%;
    margin-right: 0.02rem;
    p {
      height: 0.3rem;
      color: #fff;
      font-size: 0.12rem;
      line-height: 0.3rem;
    }
    p:nth-child(1) {
      background: #007aff;
      margin-bottom: 0.02rem;
    }
    p:nth-child(2) {
      background: rgba(0, 122, 255, 0.4);
    }
  }
  .info-box:last-child {
    margin-right: 0;
  }
}
.rules-box-package {
  background: #191a2a;
  padding: 0 0.3rem 0.45rem;
  .rules-text-box {
    background: rgba(0, 122, 255, 0.4);
    padding: 0.2rem 0.24rem;
    text-align: left;
    h5 {
      color: #fff;
      font-size: 0.14rem;
      margin-bottom: 0.04rem;
    }
    p {
      color: #fff;
      font-size: 0.12rem;
      margin-bottom: 0.1rem;
    }
    p:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
