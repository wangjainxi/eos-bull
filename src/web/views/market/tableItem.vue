<template>
  <div class="market-list-box">
    <el-table :data="thisTdata" style="width: 100%" empty-text="There's no data yet">
      <el-table-column prop="coin" label="Pairs" align="center" width="200">
        <template slot-scope="props">
          <div class="props-box">
            <img
              v-if="!props.row.favourited"
              src="../../../images/web/ic_fav_normal.svg"
              class="collection-icon"
              alt
            >
            <img v-else src="../../../images/web/ic_fav_normal1.svg" class="collection-icon" alt>
            <div class="pairs-icon">
              <img src="../../../images/web/ic_eos.svg" class="pairsIcon" alt>
            </div>
            <h4>
              <span>{{`${props.row.pair.baseCurrency.symbol.name} / ${props.row.pair.quoteCurrency.symbol.name}`}}</span>
            </h4>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lastPrice" label="Last price" align="right">
        <template slot-scope="props">
          <div class="last-price-box-rise" v-if="parseFloat(props.row.change) >= 0">
            <p>{{props.row.lastPrice}}</p>
          </div>
          <div class="last-price-box-fall" v-else>
            <p>{{props.row.lastPrice}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="change" label="24H Change" sortable align="right">
        <template slot-scope="props">
          <div class="change-box-rise" v-if="parseFloat(props.row.change) >= 0">
            <p>{{props.row.change}}</p>
          </div>
          <div class="change-box-fall" v-else>
            <p>{{props.row.change}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="high" label="24H High" align="right">
        <template slot-scope="props">
          <div class="hige-box">
            <p>{{props.row.high}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="low" label="24H Low" align="right">
        <template slot-scope="props">
          <div class="low-box">
            <p>{{props.row.low}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="volumeBase" label="24H Volume" sortable width="200" align="right">
        <template slot-scope="props">
          <div class="volume-box">
            <p>{{props.row.volumeBase}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center">
        <template slot-scope="props">
          <div class="action-box">Trade</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TableItem extends Vue {
  @Prop() thisTdata!: any;
}
</script>
