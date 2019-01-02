<template>
  <div id="web-table-details-page">
    <div class="table-roder-title">
      <p>Order Details</p>
    </div>
    <div class="list-query-condition-box">
      <!-- <el-form :model="formInline" :inline="true">
        <el-form-item label="Sort by">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Coin">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Status">
          <el-date-picker
            v-model="dateValue"
            type="datetimerange"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            :default-time="['12:00:00']"
            @change="ondateValue"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <Language resource="exchange.Search"/>
          </el-button>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="table-box">
      <el-table :data="orders" style="width: 100%" empty-text="There's no data yet">
        <el-table-column prop="coin" width="155">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Pairs"/>
          </template>
          <template slot-scope="props">
            <div class="coin-box">
              <img src="../../../images/web/logo_box.svg" />
              <p>{{props.row.size.symbol.name}} / {{ props.row.price.symbol.name }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="type" align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Type"/>
          </template>
          <template slot-scope="props">
            <p :class="props.row.type === 'Buy'?'buy-box':'sell-box'">{{props.row.type}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Time"/>
          </template>
          <template slot-scope="props">
            <p>{{ props.row.time | formatDate }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="price" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Price"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.price.amount}}
              <span>{{props.row.price.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="average" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Deal_Average"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.avgPrice.amount}}
              <span>{{props.row.avgPrice.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Amount"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.size.amount}}
              <span>{{props.row.size.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dealt" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Dealt_Num"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.filled.amount}}
              <span>{{props.row.filled.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="dealt" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Entrusted_Total"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.fees.amount}}
              <span>{{props.row.fees.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="entrusted" label="Entrusted" align="right">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Deal_Total"/>
          </template>
          <template slot-scope="props">
            <p class="props-box">
              {{props.row.filledQuote.amount}}
              <span>{{props.row.filledQuote.symbol.name}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Status"/>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header" slot-scope="scope">
            <Language resource="exchange.Action"/>
          </template>
          <template slot-scope="props">
            <p class="action-box" @click="greet(props.row.id)">Details</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { getUserHistoryOrders } from '@/utils/apis';
import { HistoryOrderParams, Order } from '@/define';

@Component
export default class extends Vue {
  @State('accountName')
  accountName!: string;

  // 订单加载中
  loading = false;

  dateValue = '';

  total = 0;

  orders: Order[] = [];

  params: HistoryOrderParams = {
    page: 1,
    pageSize: 10,
  };

  created() {
    this.initData();
  }

  async initData() {
    this.loading = true;
    this.fetchOrders().finally(() => {
      this.loading = false;
    });
  }

  async fetchOrders() {
    const res = await getUserHistoryOrders(this.accountName, this.params);
    this.orders = res.orders;
    this.total = res.count;
  }

  handleSizeChange(val: any) {
    console.log(val);
  }
  handleCurrentChange(val: any) {
    console.log(val);
  }
  onSubmit() {
    console.log(11);
  }
  setDate() {
    console.log(11);
  }
  ondateValue() {
    console.log(this.dateValue);
  }
}
</script>
<style lang="scss">
#web-table-details-page {
  .el-table__expanded-cell[class*='cell'] {
    padding: 5px 77px;
  }
  .el-table__expanded-cell {
    background: #0d1f35;
  }
  .el-table__expanded-cell:hover {
    background: #0d1f35 !important;
  }
  .expand-box {
    .el-table th,
    .el-table td {
      padding: 5px 0;
      height: 36px;
    }
  }
  .el-table__row {
    background: #142e4d;
  }
  .el-table .cell {
    padding-left: 10px;
  }
  .table-roder-title {
    border-bottom: 1px solid #1e3a5d;
    padding: 40px 0 10px;
    margin-bottom: 20px;
    text-align: left;
    p {
      font-size: 20px;
      color: #92a7c5;
    }
  }
  .table-box {
    color: #ddd;
    .coin-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-left: -10px;
        width: 28px;
      }
      > p {
        font-size: 14px;
        line-height: 16px;
        color: #2d7be5;
      }
    }
    .buy-box {
      color: #1cc466;
    }
    .sell-box {
      color: #e53757;
    }
    .props-box,
    .amount-box,
    .entrusted-box {
      span {
        color: #677bb7;
      }
    }
    .action-box {
      color: #2d7be5;
      cursor: pointer;
    }
  }
  .pagination-box {
    padding: 30px 0;
    background: #142e4d;
    border-radius: 0 0 8px 8px;
    .el-input__inner {
      background: #142e4d;
      border-color: #1e3a5d;
      color: #ddd;
    }
    .el-pagination button:disabled {
      background: #142e4d;
      color: #ddd;
    }
    .el-pager li {
      background: #142e4d;
      color: #ddd;
    }
    .el-pager li.active {
      color: #2d7be5;
    }
    .el-pagination .btn-prev {
      background: #142e4d;
      color: #ddd;
    }
    .el-pagination .btn-next {
      background: #142e4d;
      color: #ddd;
    }
    .el-pagination__total {
      color: #ddd;
    }
    .el-pagination__jump {
      color: #ddd;
    }
  }
  .el-form {
    .el-input__inner {
      background: #1e3a5d;
      border-color: #1e3a5d;
      color: #ddd;
    }
    .el-form-item:nth-child(5) {
      .el-form-item__content {
        width: 250px;
        input {
          background: #142e4d;
          border-color: #142e4d;
        }
        .el-date-editor--datetimerange.el-input__inner {
          width: 100%;
        }
        .el-input__inner {
          border-radius: 20px;
          border-color: #244166;
          background: #142e4d;
        }
      }
      .el-date-editor .el-range-input {
        color: #ddd;
      }
    }
    .el-form-item:nth-child(6) {
      margin: 0;
      .el-form-item__content {
        width: 80px;
      }
      .el-button {
        width: 100%;
        background: none;
        border-color: #6e84a3;
      }
    }
  }
  .el-form-item__label,
  .el-button--primary {
    color: #92a7c5;
  }

  .list-query-condition-box {
    background: #142e4d;
    padding: 20px 10px;
    border-radius: 8px 8px 0 0;
    .el-form-item {
      margin-bottom: 0;
      margin-right: 25px;
    }
    .el-form-item__content {
      width: 120px;
    }
  }
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: rgba(45, 123, 229, 0.3);
}
</style>
