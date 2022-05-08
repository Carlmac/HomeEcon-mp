import cache from '../../enum/cache'
import {setTabBarBadge} from '../../utils/wx'
import Token from '../../model/token'
import User from '../../model/user'
import { appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid } from "../../config/grid";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickname: '点击授权登录',
      avatar: '../../images/logo.png'
    },
    // 宫格配置
    // 预约我的宫格
    appointWithMeGrid: appointWithMeGrid,
    // 我的预约宫格
    myAppointGrid: myAppointGrid,
    // 我在提供宫格
    myProvideGird: myProvideGird,
    // 正在找宫格
    mySeekGrid: mySeekGrid,
  },

  onLoad: function (options) {

  },

  async onShow() {
    const unreadCount = wx.getStorageSync(cache.UNREAD_COUNT)
    setTabBarBadge(unreadCount)

    const verifyToken = await Token.verifyToken()

    if (verifyToken.valid) {
      const userInfo = User.getUserInfoByLocal()
      this.setData({
        userInfo
      })
    }
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  }
})