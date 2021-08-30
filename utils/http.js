import APIConfig from '../config/api'
import exceptionMessage from '../config/exception-message'
import wxToPromise from './wx'

export default class Http {
  static async request({ url, data, method = 'GET' }) {

    const res = await wxToPromise('request',{
      url: APIConfig.baseUrl + url,
      data,
      method
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