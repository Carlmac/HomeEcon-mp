/**
 * TIM 即时通信
 */
// 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import timConfig from '../config/tim'
import User from './user'
import genTestUserSig from '../lib/tim/generate-test-usersig'

class Tim {
  /**
   *
   * @type {Tim}
   */
  static instance = null;
  _SDKInstance = null;
  _nextReqMessageID = '';
  _messageList = [];

  constructor() {
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    let tim = TIM.create(timConfig.options); // SDK 实例通常用 tim 表示

    // 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
    tim.setLogLevel(timConfig.logLevel);
    // tim.setLogLevel(1);

    // 注册腾讯云即时通信 IM 上传插件
    tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});

    this._SDKInstance = tim;
  }

  static getInstance() {
    if (!Tim.instance) {
      Tim.instance = new Tim();
    }

    return Tim.instance;
  }

  getSDK() {
    return this._SDKInstance;
  }

  async getMessageList(targetUserId, count = 10) {
    if (this.isCompleted) {
      return this._messageList;
    }

    const res = await this._SDKInstance.getMessageList({
      conversationID: `C2C${targetUserId}`,
      nextReqMessageID: this._nextReqMessageID,
      count: count > 15 ? 15 : count
    })

    this._nextReqMessageID = res.data.nextReqMessageID;
    this.isCompleted = res.data.isCompleted;
    this._messageList = res.data.messageList;

    return this._messageList;
  }

  async setMessageRead(targetUserId) {
    const res = await this._SDKInstance.setMessageRead({
      conversationID: `C2C${targetUserId}`
    });

    return res.data;
  }

  login() {
    const userInfo = User.getUserInfoByLocal();
    const textUserSig = genTestUserSig(userInfo.id.toString())

    this._SDKInstance.login({
      userID: userInfo.id.toString(),
      userSig: textUserSig.userSig
    });
  }

  logout() {
    this._SDKInstance.logout();
  }

  reset() {
    this._nextReqMessageID = '';
    this.isCompleted = false;
    this._messageList = [];
    return this;
  }
}

export default Tim;