<template>
  <div class="tradding-view-style">
    <VueTradingView :options="{
      symbol: 'BTC/USD',
      theme: 'Light',
      toolbar_bg:'#131722',
      allow_symbol_change: true,
      autosize:true,
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
        'loading_screen'
      ],
    }" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'trading-view',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.tradding-view-style {
  height: 100%;
}
</style>
