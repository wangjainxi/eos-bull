<template>
  <div class="hello">
    <VueTradingView :options="{
      symbol: 'BTC/USD',
      theme: 'dark',
        toolbar_bg:'#131722',
      allow_symbol_change: true,
      autosize:true,
      debug: false,
      width: '100%',
      height: '100%',
         overrides: {
        'mainSeriesProperties.showCountdown': true,
        'paneProperties.background': '#131722',
        'paneProperties.vertGridProperties.color': '#363c4e',
        'paneProperties.horzGridProperties.color': '#363c4e',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#AAA',
        'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
        'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
      },
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
      ],
    }" />
  </div>
</template>

<script lang="ts">
import VueTradingView from 'vue-trading-view';
export default {
  name: 'trading-view',
  props: {
    msg: String,
  },
  components: {
    VueTradingView,
  },
};
</script>
