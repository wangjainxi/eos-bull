<template>
  <div class="tradding-view-style">
    <VueTradingView :options="options"/>
  </div>
</template>

<script lang="ts">
import VueTradingView from 'vue-trading-view';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {
    VueTradingView,
  },
})
export default class TradingView extends Vue {
  options = {
    symbol: 'BTC/USD',
    theme: 'Light',
    toolbar_bg: '#131722',
    allow_symbol_change: true,
    autosize: true,
    debug: true,
    width: '100%',
    interval: '15',
    height: '100%',
    disabled_features: [
      'control_bar',
      'timeframes_toolbar',
      'header_symbol_search',
      'symbol_search_hot_key',
      'header_interval_dialog_button',
      'header_fullscreen_button',
      'header_screenshot',
      'countdown',
      'header_compare',
      'header_indicators',
      'header_chart_type',
      'snapshot_trading_drawings',
      'loading_screen',
    ],
  };
}
</script>

<style scoped>
.tradding-view-style {
  height: 100%;
}
</style>
