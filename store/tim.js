import {observable, action} from "mobx-miniprogram";
import Tim from '../model/tim'
import TIM from 'tim-wx-sdk'

export const timStore = observable({
  // 数据字段
  sdkReady: false,
  messageList: [],
  _targetUserId: null,

  // actions
  login: action(function () {
    this._runListener();
    Tim.getInstance().login();
  }),

  logout: action(function () {
    Tim.getInstance().logout();
  }),

  _runListener() {
    const sdk = Tim.getInstance().getSDK();
    sdk.on(TIM.EVENT.SDK_READY, this._handleSDKReady, this);
    sdk.on(TIM.EVENT.SDK_NOT_READY, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.KICKED_OUT, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.MESSAGE_RECEIVED, this._handleMessageReceived, this)
  },

  getMessageList: action(async function() {
    if (!this._targetUserId) {
      throw Error('未指定目标用户ID')
    }

    this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId)
    await Tim.getInstance().setMessageRead(this._targetUserId)
  }),

  async _handleMessageReceived(event) {
    if (!this._targetUserId) {
      throw Error('未指定目标用户ID')
    }

    const currentConversationMessage = event.data
      .filter(item => item.from === this._targetUserId)

    if (currentConversationMessage.length) {
      this.messageList = this.messageList.concat(currentConversationMessage)
      await Tim.getInstance().setMessageRead(this._targetUserId)
    }
  },

  setTargetUserId: action(function (targetUserId) {
    this._targetUserId = targetUserId;
  }),

  _handleSDKReady() {
    this.sdkReady = true;
  },

  _handleSDKNotReady() {
    this.sdkReady = false;
  },
});