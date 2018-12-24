<template>
  <div>ddd<div id="tv_chart_container" class='TVChartContainer' /></div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Datafeed from './api/index.js';
export default class extends Vue {
  beforeMount() {
    console.log(Datafeed);
  }
  mounted() {
    const widget = (window.tvWidget = new window.TradingView.widget({
      symbol: 'Coinbase:BTC/USD',
      interval: '15',
      containerId: 'tv_chart_container',
      libraryPath: '/charting_library/',
      chartsStorageUrl: 'https://saveload.tradingview.com',
      chartsStorageApiVersion: '1.1',
      clientId: 'tradingview.com',
      userId: 'public_user_id',
      fullscreen: false,
      autosize: true,
      studiesOverrides: {},
      toolbar_bg: '#131722',
      allow_symbol_change: true,
      theme: 'dark',
      debug: false,
      datafeed: Datafeed,
      locale: 'en',
      // disabled_features: ['use_localstorage_for_settings',],
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
      // disabled_features: ["control_bar","timeframes_toolbar"],
      enabled_features: ['move_logo_to_main_pane'],
      // enabled_features: ['study_templates'],
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
    }));

    widget.onChartReady(() => {
      console.log('Chart has loaded!');
    });
  }

  getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
</script>Î
