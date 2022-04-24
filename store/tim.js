import {observable, action} from "mobx-miniprogram";
import Tim from '../model/tim'
import TIM from 'tim-wx-sdk'
import User from '../model/user'
import {setTabBarBadge} from '../utils/wx'

export const timStore = observable({
  // 数据字段
  sdkReady: false,
  messageList: [],
  _targetUserId: null,
  intoView: 0,
  isCompleted: false,
  conversationList: [],

  // actions
  login: action(function () {
    this._runListener();
    Tim.getInstance().login();
  }),

  logout: action(function () {
    Tim.getInstance().logout();
  }),

  pushMessage: action(function (message) {
    this.messageList = this.messageList.concat([message]);
    this.intoView = this.messageList.length - 1;
  }),

  scrollMessageList: action(async function () {
    const messageList = await Tim.getInstance().getMessageList(this._targetUserId)
    this.intoView = messageList.length - 2;
    this.isCompleted = Tim.getInstance().isCompleted;
    this.messageList = messageList.concat(this.messageList.slice())
  }),

  getConversationList: action(async function () {
    const conversationList = await Tim.getInstance().getConversationList();
    return conversationList;
  }),

  _runListener() {
    const sdk = Tim.getInstance().getSDK();
    sdk.on(TIM.EVENT.SDK_READY, this._handleSDKReady, this);
    sdk.on(TIM.EVENT.SDK_NOT_READY, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.KICKED_OUT, this._handleSDKNotReady, this)
    sdk.on(TIM.EVENT.MESSAGE_RECEIVED, this._handleMessageReceived, this)
    sdk.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this._handleConversationListUpdate, this)
  },

  getMessageList: action(async function() {
    if (!this._targetUserId) {
      throw Error('未指定目标用户ID')
    }

    this.messageList = await Tim.getInstance().reset().getMessageList(this._targetUserId);
    this.intoView = this.messageList.length - 1;
    await Tim.getInstance().setMessageRead(this._targetUserId);
  }),

  async _handleMessageReceived(event) {
    if (!this._targetUserId) {
      return
    }

    const currentConversationMessage = event.data
      .filter(item => item.from === this._targetUserId)

    if (currentConversationMessage.length) {
      this.messageList = this.messageList.concat(currentConversationMessage);
      this.intoView = this.messageList.length - 1;
      await Tim.getInstance().setMessageRead(this._targetUserId);
    }
  },

  async _handleConversationListUpdate(event) {
    if (!event.data.length) {
      return
    }

    this.conversationList = event.data;
    const unreadCount = event.data.reduce((sum, item) => sum + item.unreadCount, 0)
    setTabBarBadge(unreadCount)
  },

  setTargetUserId: action(function (targetUserId) {
    this._targetUserId = targetUserId;
  }),

  _handleSDKReady() {
    this.sdkReady = true;
    const userInfo = User.getUserInfoByLocal();
    Tim.getInstance().updateUserProfile(userInfo);
  },

  _handleSDKNotReady() {
    this.sdkReady = false;
  },
});