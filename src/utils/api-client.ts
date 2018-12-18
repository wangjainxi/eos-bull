import Axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

// import { homePageStore } from '@/mobx/homePageStore';
interface ResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}

type Response<T = any> = AxiosResponse<ResponseData<T>>;

const instance = Axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL:'http://47.52.113.167:5566',
  timeout: 10000,
});

instance.interceptors.request.use(
  (conf: AxiosRequestConfig) => {
    // TODO: get accessToken from store.
    Object.assign(conf.headers, {
      sessionId: sessionStorage.getItem('sessionId'),
    });
    return conf;
  },
  () => {
    return new Promise(() => {
      //
    });
  }
);

class ApiError extends Error implements AxiosError {
  config: any;
  resCode?: number;
  msg?: string;
  request?: any;
  response?: AxiosResponse;
  data: any;
  static fromAxiosError(error: AxiosError) {
    const err = new ApiError();
    const { response, config, request } = error;
    if (response && typeof response.data === 'object') {
      err.resCode = response.data.code;
      err.msg = response.data.msg;
    }
    err.config = config;
    err.request = request;
    err.response = response;
    return err;
  }
}

instance.interceptors.response.use(
  // if the response code is less than 0, throw new ApiError.
  (res: AxiosResponse<ResponseData<Object>>) => {
    const { code, msg, data } = res.data;
    if (res.data.code < 0) {
      if (res.data.code === -10022) {
        return new Promise(() => {
          //
        });
      }
      if (res.data.code === -100023) {
        return new Promise(() => {
          //
        });
      }
      // if (res.data.code + ''[0] === '1') {
      //   notice('error', 'Error', res.data.msg);
      //   return new Promise(() => {
      //     //
      //   });
      // }
      const err = new ApiError(res.data.msg || 'Request fail.');
      err.resCode = code;
      err.msg = msg;
      err.data = data;
      err.response = res;
      err.config = res.config;
      err.request = res.request;
      return Promise.reject(err);
    }
    return res;
  },
  (error: AxiosError) => {
    //网络错误
    const err = ApiError.fromAxiosError(error);
    if (!err.response) {
      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

export function resWrapper<T = any>(res: Response<T>) {
  return res.data.data;
}

export default instance;
