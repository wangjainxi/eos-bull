import { Market } from '@/define';

import EOS from 'eosjs';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

ScatterJS.plugins(new ScatterEOS());

const network = {
  blockchain: process.env.REACT_APP_NETWORK_BLOCKCHAIN,
  host: process.env.REACT_APP_NETWORK_HOST,
  port: process.env.REACT_APP_NETWORK_PORT,
  protocol: process.env.REACT_APP_NETWORK_PROTOCOL,
  chainId: process.env.REACT_APP_NETWORK_CHAIN_ID,
};

let scatter: any = null;
let eos: any = null;
let scatterLoading = true;
let scatterInstalled = false;

const lazyInitScatter = async () => {
  if (scatter) return;
  try {
    const connected = await ScatterJS.scatter.connect('EOSmex');
    scatterInstalled = connected;
    scatter = ScatterJS.scatter;
    eos = scatter.eos(network, EOS, {});
    scatterInstalled = true;
    scatterLoading = false;
  } catch (err) {
    scatterLoading = false;
    scatterInstalled = false;
  }
};

const checkStatter = () => {
  if (scatterLoading) {
    console.warn('scatter loading...');
    return Promise.reject();
  }

  if (!scatterInstalled) {
    console.error('scatter not installed.');
    return Promise.reject();
  }
  return Promise.resolve();
};

const callScatterApi = async <T = any>(apiName: string, ...args: Array<any>) => {
  await lazyInitScatter();
  await checkStatter();
  return (await scatter[apiName](...args)) as T;
};

const callEosApi = async <T = any>(apiName: string, ...args: Array<any>) => {
  await lazyInitScatter();
  await checkStatter();
  try {
    return (await eos[apiName](...args)) as T;
  } catch (err) {
    if (typeof err !== 'string') throw err;
    const obj = JSON.parse(err);
    const msg = obj.error.details[0]
      ? obj.error.details[0].message.replace('assertion failure with message: ', '')
      : obj.error.name;
    throw new Error(msg);
  }
};

export const getIdentity = async () => {
  const res = await callScatterApi('getIdentity', { accounts: [network] });
  return res.accounts[0];
};

export const getAccount = async (accountName: string) => {
  const res = await callEosApi('getAccount', accountName);
  return res;
};

const transaction = async (...args: any[]) => {
  let actions;
  if (Array.isArray(args[0])) {
    actions = args[0];
  } else {
    const { name, authority } = await getIdentity();
    const authorization = [{ actor: name, permission: authority }];
    actions = [{ account: args[1], name: args[0], authorization, data: args[2] }];
  }
  const params = { context_free_actions: [], actions };
  return await callEosApi('transaction', params);
};

export const createOrder = async (market: Market) => {
  const { name, authority } = await getIdentity();
  const authorization = [{ actor: name, permission: authority }];
  await transaction([
    {
      account: process.env.VUE_APP_MEX_CONTRACT,
      name: 'neworder',
      authorization,
      data: {
        user: name,
        market_id: market.marketId,
        price: 1,
        size: 1,
        order_side: 1,
        order_type: 1,
        time_in_force: 1,
        post_only: 1,
      },
    },
    {
      account: '代币合约',
      name: 'transfer',
      authorization,
      data: {
        from: '用户账户',
        to: '交易所合约',
        quantity: '交易所需金额',
        memo: '',
      },
    },
  ]);
};

export const cancelOrder = async (orderId: number) => {
  await transaction('cxlorder', process.env.VUE_APP_MEX_CONTRACT, {
    order_id: orderId,
  });
};
