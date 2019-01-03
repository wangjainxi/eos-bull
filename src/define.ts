export enum MARKET_STATUS {
  ACTIVE = 1, // 正常交易
  SUSPENDED = 2, // 交易暂停
}

export enum ORDER_SIDE {
  bid = 1, // 买单
  ask = 2, // 卖单
}

export enum ORDER_TYPE {
  limit = 1, // 限价单
  market = 2, // 市价单
}

export enum ORDER_STATUS {
  pending = 1, // 未撮合
  partially_filled = 2, //部分撮合
  filled = 3, //完全撮合
  cancelled = 4, // 取消
}

export enum TIME_IN_FORCE {
  gtc = 1, // 直到取消前都正常挂单
  fok = 2, // 要么全单撮合，要么全单取消
  ioc = 3, // 要么全单撮合，要么将剩余的量取消
}

/**
 * 表示代币符号，例如EOS，其中精度表示小数点位数。
 */
export interface CoinSymbol {
  name: string; // 代币名称
  precision: string; // 代币精度
}

/**
 * 表示完整的代币符号，包含代币合约。
 */
export interface ExtendedSymbol {
  symbol: CoinSymbol;
  contract: string; // 代币合约
}

/**
 * 表示代币资产
 */
export interface CoinAsset {
  amount: string;
  symbol: CoinSymbol;
}

/**
 * 表示代币资产，包含代币合约。
 */
export interface ExtendedAsset {
  amount: string;
  symbol: ExtendedSymbol;
}

/**
 * 代币信息，用以展示代币的介绍。
 */
export interface TokenInfo {
  symbol: CoinSymbol; //代币符号
  icon: string; //代币图标URL
  introduction: CoinAsset; // 代币简介
  maxSupply: CoinAsset; // 总发行量
  circulatingSupply: string; // 当前流通量
  contract: string; // 代币合约
  website: string; // 项目网址
}

/**
 * 代表一个交易对，其中baseCurrency和quoteCurrency分表表示交易对上面和下面的代币。
 * 例如交易对EOS/USDT中，EOS是baseCurrency，而USDT则为quoteCurrency。
 */
export interface TradingPair {
  baseCurrency: ExtendedSymbol;
  quoteCurrency: ExtendedSymbol;
}

/**
 * 代表一个交易市场。除了交易对本身外，还包含了过去24小时内的一些统计信息。
 */
export interface Market {
  marketId: number; // 市场ID
  favourited: boolean; // 用户是否收藏该市场
  pair: TradingPair;
  baseCurrencyIcon: string;
  pricePrecision: number;
  sizePrecision: number;
  status: MARKET_STATUS;
  lastPrice: string; // 最新交易价格
  change: string; // 24小时价格变化
  high: string; // 24小时最高价格
  low: string; // 24小时最低价格
  volumeBase: string; // 以baseCurrency表示的24小时交易量
  volumeQuote: string; // 以quoteCurrency表示的24小时交易量
  makerFee: string; // Maker费率百分比
  takerFee: string; // Taker费率百分比
}

/**
 * 历史订单参数
 */
export interface HistoryOrderParams {
  page?: number; // 页数，从1开始
  pageSize?: number; // 每页条目数
  baseCurrency?: string; // 基础货币符号
  side?: ORDER_SIDE; // 订单方向
  status?: ORDER_STATUS; // 订单状态
  startTime?: string; // 开始时间
  endTime?: string; // 结束时间
  ignoreCanceled?: boolean; // 是否显示取消订单
}

/**
 * 代表一个订单
 */
export interface Order {
  orderId: number; // 订单ID
  marketId: number; // 市场ID
  account: string; // 用户名
  time: string; // 下单时间
  side: ORDER_SIDE;
  type: ORDER_TYPE;
  timeInForce: TIME_IN_FORCE;
  status: ORDER_STATUS;
  price: CoinAsset; // 订单价格
  size: CoinAsset; // 订单数量
  filled: CoinAsset; // 已撮合数量
  filledQuote: CoinAsset; // 用quoteCurrency表示的已撮合金额
  avgPrice: CoinAsset; // 平均成交价格
  fees: CoinAsset; // 交易总费用
  trxId: string; // 下单交易哈希
}

/**
 * 代表一次撮合
 */
export interface Trade {
  marketId: number; // 市场ID
  buyer: string; // 买家账户名
  seller: string; // 卖家账户名
  buyerOrderId: number; // 买家订单ID
  sellerOrderId: number; // 卖家订单ID
  makerOrderSide: ORDER_SIDE; // Maker订单方向
  price: CoinAsset; // 撮合价格
  size: CoinAsset; // 撮合数量
  buyerFee: ExtendedAsset;
  sellerFee: ExtendedAsset;
  time: string; // 撮合时间
  trxIds: TradeTransactions; // 撮合交易哈希
}

/**
 * 代表订单簿上的一个价格高度
 */
export interface PriceLevel {
  price: string; // 价格
  size: string; // 总订单大小
}

/**
 * 代表一个完整的订单簿。其中bids代表买单，按照价格降序排列；asks代表卖单，按照价格升序排列。
 */
export interface Orderbook {
  marketId: number;
  asks: Array<PriceLevel>;
  bids: Array<PriceLevel>;
}

/**
 * 在WebSocket流中用于更新订单簿条目的数据格式
 */
export interface PriceLevelUpdate {
  marketId: number; //市场ID
  side: ORDER_SIDE;
  price: string; // 价格
  size: number; // 更新后大小，0表示移除
}

/**
 * 在WebSocket流中用于更新市场列表中的数据
 */
export interface TickerUpdate {
  marketId: number; // 市场ID
  lastPrice: string; // 最新交易价格
  change: string; // 24小时价格变化
  high: string; // 24小时最高价格
  low: string; // 24小时最低价格
  volumeBase: number; // 以baseCurrency表示的24小时交易量
  volumeQuote: number; // 以quoteCurrency表示的24小时交易量
}

/**
 * 在WebSocket流中用于更新账户余额数据
 */
export interface BalanceUpdate {
  accountName: string; // 用户账户名
  newBalance: TokenBalance; // 新余额
}

/**
 * 用于My Wallet页面展示代币余额
 */
export interface TokenBalance {
  available: ExtendedAsset;
  onOrder: ExtendedAsset;
  estValue: CoinAsset;
}

/**
 * 用于My Wallet页面展示
 */
export interface AccountInfo {
  accountName: string;
  estValue: CoinAsset;
  eos: {
    available: CoinAsset;
    staked: CoinAsset;
    refunding: CoinAsset;
    onOrder: CoinAsset;
  };
  tokens: Array<TokenBalance>;
  tokenMetas: Array<TokenMeta>;
}

/**
 * 表示公告详情
 */
export interface Announcement {
  announcementId: number;
  time: string;
  title: string;
  content: string;
}

/**
 * 表示代币相关信息
 */
export interface TokenMeta {
  token: ExtendedSymbol;
  iconUrl: string;
  listedMarkets: Array<MarketMeta>;
}

export interface OrdersWithIcons {
  orders: Array<Order>;
  icons: Array<MarketIcon>;
}

export interface MarketIcon {
  marketId: number;
  iconUrl: string;
}

export interface MarketMeta {
  marketId: number;
  pair: TradingPair;
}

export interface TradeTransactions {
  buyerOrderTrxId: string;
  sellerOrderTrxId: string;
  buyerSettlementTrxId: string;
  sellerSettlementTrxId: string;
}

interface ResOrderItem {
  price: string;
  size: string;
}

export interface ResOrder {
  asks: Array<ResOrderItem>;
  bids: Array<ResOrderItem>;
  marketId: number;
}
