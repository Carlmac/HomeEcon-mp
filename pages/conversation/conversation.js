import Tim from '../../model/tim'
// import TIM from 'tim-wx-sdk'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {timStore} from '../../store/tim'

Page({
  data: {
    targetUserId: null,
    service: null,
    isSent: false,
  },
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady'],
      actions: ['pushMessage', 'resetMessage', 'getConversationList']
    });

    const targetUserId = options.targetUserId;
    // const targetUserId = 'testUser';

    this.setData({
      targetUserId,
      service: options.service ? JSON.parse(options.service) : null
    })
  },

  onUnload() {
    if (!this.data.isSent) {
      this.getConversationList()
    }
    this.resetMessage();
    this.storeBindings.destroyStoreBindings();
  },

  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  handleSendMessage(event) {
    const {type, content} = event.detail;
    const message = Tim.getInstance().createMessage(type, content, this.data.targetUserId);
    this.pushMessage(message);
    Tim.getInstance().sendMessage(message);
    this.data.isSent = true;
    // this.getOpenerEventChannel().emit('sendMessage')
  }
});