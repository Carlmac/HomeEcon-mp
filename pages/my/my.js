import cache from '../../enum/cache'
import {setTabBarBadge} from '../../utils/wx'
import Token from '../../model/token'
import User from '../../model/user'
import { appointWithMeGrid, myAppointGrid, myProvideGird, mySeekGrid } from "../../config/grid";
import Order from '../../model/order'
import roleType from '../../enum/role-type'
import serviceType from '../../enum/service-type'
import Service from '../../model/service'

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

    appointWithMeStatus: null,
    myAppointStatus: null,
    provideServiceStatus: null,
    seekServiceStatus: null,
  },

  onLoad(options) {

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
      this._getOrderStatus()
      this._getServiceStatus()
    }
  },

  async _getOrderStatus() {
    const appointWithMeStatus = Order.getOrderStatus(roleType.PUBLISHER)
    const myAppointStatus = Order.getOrderStatus(roleType.CONSUMER)
    this.setData({
      appointWithMeStatus: await appointWithMeStatus,
      myAppointStatus: await myAppointStatus
    })
  },

  async _getServiceStatus() {
    const provideServiceStatus = Service.getServiceStatus(serviceType.PROVIDE)
    const seekServiceStatus = Service.getServiceStatus(serviceType.SEEK)
    this.setData({
      provideServiceStatus: await provideServiceStatus,
      seekServiceStatus: await seekServiceStatus,
    })
  },

  handleToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  }
})