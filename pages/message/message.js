// pages/message/message.js
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {timStore} from '../../store/tim'
import {getDataSet} from '../../utils/utils'
import cache from '../../enum/cache'
import {setTabBarBadge} from '../../utils/wx'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationList: [],
    // updateConversationList: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ['sdkReady', 'conversationList'],
      // actions: ['getConversationList']
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (this.data.updateConversationList) {
    //   this.getConversationList()
    //   this.data.updateConversationList = false;
    // }

    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings();
  },

  handleSelect(event) {
    // this.data.updateConversationList = true;
    const item = getDataSet(event, 'item')
    wx.navigateTo({
      url: `/pages/conversation/conversation?targetUserId=${item.userProfile.userID}}&service=`,
      // events: {
      //   sendMessage: () => {
      //     this.data.updateConversationList = false;
      //   }
      // }
    })
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
})