import Service from '../../model/service';
import Category from '../../model/category';
import {throttle} from '../../utils/utils'
import Tim from '../../model/tim'

const service = new Service();

Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    tabIndex: 0,
    categoryList: [],
    categoryId: 0,
    loading: true
  },
  onLoad: async function (options) {
    new Tim();
    await this._getServiceList();
    await this._getCategoryList();
    this.setData({
      loading: false
    })
  },

  async _getServiceList() {
    // 获取服务列表数据
    const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex);
    // console.log(serviceList);
    this.setData({
      serviceList
    });
  },

  async _getCategoryList() {
    const categoryList = await Category.getCategoryListWithAll()
    this.setData({
      categoryList
    })
  },

  handleTabChange(e) {
    this.setData({
      tabIndex: e.detail.index
    });
    this._getServiceList();
  },

  handleCategoryChange: throttle(function(e) {
    const categoryId = e.currentTarget.dataset.id;
    if (this.data.categoryId === categoryId) {
      return;
    }
    this.setData({
      categoryId
    });
    this._getServiceList();
  }),

  handleSelectService: function (event) {
    const service = event.currentTarget.dataset.service;
    wx.navigateTo({
      url: '/pages/service-detail/service-detail?service_id=' + service.id
    })
  },

  async onPullDownRefresh() {
    this._getServiceList();
    wx.stopPullDownRefresh();
  },

  async onReachBottom() {

    if (!service.hasMoreData) {
      return this.data;
    }

    const serviceList = await service.getServiceList(this.data.categoryId, this.data.tabIndex);

    this.setData({
      serviceList
    });
  }
});