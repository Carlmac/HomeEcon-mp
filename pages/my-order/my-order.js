import Order from "../../model/order";
import {getEventParam} from "../../utils/utils";

const order = new Order();

Page({
  data: {
    tabs: [
      '全部订单',
      '待处理',
      '待支付',
      '待确认',
      '待评价',
    ],
    active: 0,
    role: null,
    status: null,
  },

  onLoad: function (options) {
    const role = parseInt(options.role);
    const status = parseInt(options.status);
    // status: -1 全部 0 待同意 1 待支付 2 待确认 3 待评价

    this.setData({
      role,
      active: status + 1,
    })

    this.data.status = status < 0 ? '' : status;
    this._getOrderList()
  },

  async _getOrderList() {
    const orderList = await order.reset().getMyOrderList(this.data.role, this.data.status)
    this.setData({
      orderList,
    })
  },

  async handleTabChange(e) {
    const index = getEventParam(e, 'index');
    this.data.status = index < 1 ? '' : index - 1;
    await this._getOrderList()
  },

  async onPullDownRefresh() {
    await this._getOrderList()
    wx.stopPullDownRefresh()
  },

  async onReachBottom() {
    if (!order.hasMoreData) {
      return
    }

    const orderList = order.getMyOrderList(this.data.role, this.data.status)
    this.setData({
      orderList,
    })
  },
});