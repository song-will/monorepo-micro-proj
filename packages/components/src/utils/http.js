import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  timeout: 1000 * 15,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// 配置接口拦截器
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;

export { AxiosRequestConfig };
