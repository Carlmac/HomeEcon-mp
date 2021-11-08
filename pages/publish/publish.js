// pages/publish/publish.js
import Service from '../../model/service'
import {getEventParam} from '../../utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image_id: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_date: '',
      price: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleSubmit(event) {
    const res = await wx.showModal({
      title: '提示',
      content: '是否确认申请发布该服务？',
      showCancel: true
    })

    if (!res.confirm) {
      return
    }

    wx.showLoading({
      title: '正在发布...',
      mask: true
    })

    const formData = getEventParam(event, 'formData')
    try {
      await Service.publishService(formData)
      this._resetForm()
      wx.navigateTo({
        url: `/pages/publisher-success/publisher-success?type=${formData.type}`
      })
    } catch (e) {
      console.log(e)
    }
    wx.hideLoading()
  },

  _resetForm() {
    this.setData({
      formData: {
        type: null,
        title: '',
        category_id: null,
        cover_image_id: null,
        description: '',
        designated_place: false,
        begin_date: '',
        end_date: '',
        price: ''
      }
    })
  }
})