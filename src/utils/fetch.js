import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui';
import store from '../store';
import {
  getToken
} from 'utils/auth';
const service = axios.create({
  timeout: 60000 
});

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
   return config;
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
      return response.data;
  },
  error => {
    Message({
      message: '服务器异常，请检查',
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
