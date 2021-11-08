import {getEventParam} from '../../utils/utils'
import Service from '../../model/service'

Page({
  data: {},
  onLoad(options) {
    const service = JSON.parse(options.service);
    this._init(service);
  },

  async handleSubmit(event) {
    const res = await wx.showModal({
      title: '提示',
      content: '是否确认修改该服务？提交后会重新进入审核状态',
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
      await Service.editService(this.serviceId, formData)
      // this._resetForm()
      wx.redirectTo({
        url: `/pages/publisher-success/publisher-success?type=${formData.type}`
      })
    } catch (e) {
      console.log(e)
    }
    wx.hideLoading()
  },

  _init(service) {
    const formData = {
      type: service.type,
      title: service.title,
      category_id: service.category_id,
      cover_image: service.cover_image,
      description: service.description,
      designated_place: service.designated_place,
      begin_date: service.begin_date,
      end_date: service.end_date,
      price: service.price
    }
    this.setData({
      formData,
      serviceId: service.id
    })
  }
});