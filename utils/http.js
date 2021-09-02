import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'
import cache from '../enum/cache'

export default class Http {
  static async request({ url, data, method = 'GET' }) {

    const res = await wxToPromise('request',{
      url: APIConfig.baseUrl + url,
      data,
      method,
      header: {
        token: wx.getStorageSync(cache.TOKEN)
      }
    });

    // 全局统一响应、异常处理
    // todo 请求成功
    if (res.statusCode < 400) {
      return res.data.data;
    }

    // todo 请求失败
    if (res.statusCode === 401) {
      // todo 令牌相关操作
      return
    }

    Http._showError(res.data.error_code, res.data.message);

    const error = typeof res.data.message === 'object'
      ? Object.value(res.data.message).join(';')
      : res.data.message;

    throw Error(error);

  }

  static _showError(errorCode, message) {
    let title = '';
    const errorMsg = exceptionMessage[errorCode];
    title = errorMsg || message || '未知异常';

    title = typeof title === 'object'
      ? Object.value(title).join(';')
      : title;

    wx.showToast({
      title,
      icon: 'none',
      duration: 3000
    })
  }
}