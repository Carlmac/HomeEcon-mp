// pages/message/message.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {timStore} from '../../store/tim'
import {getDataSet} from '../../utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady', 'conversationList'],
      actions: ['getConversationList']
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings();
  },

  handleSelect(event) {
    const item = getDataSet(event, 'item')
    wx.navigateTo({
      url: `/pages/conversation/conversation?targetUserId=${item.userProfile.userID}}&service=`
    })
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
})