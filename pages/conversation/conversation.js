// import Tim from '../../model/tim'
// import TIM from 'tim-wx-sdk'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'

Page({
  data: {
    targetUserId: null,
    service: null
  },
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady']
    });

    this.setData({
      targetUserId: options.targetUserId,
      service: options.service
    })
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },

  handleLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  handleSendMessage(event) {
    const { type, content } = event.detail;
    const message = Tim.getInstance().createMessage(type, content, this.data.targetUserId);
    Tim.getInstance().sendMessage(message);
  }
});