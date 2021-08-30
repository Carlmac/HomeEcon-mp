import User from '../../model/user'

Page({
  data: {},
  onLoad: function (options) {

  },

  async handleLogin() {
    const res = await wx.getUserProfile({
      desc: '完善用户信息',

    });
    wx.showLoading({
      title: '正在授权'
    });
    await User.login();
    await User.updateUserInfo(res.userInfo);
    wx.hideLoading();
    wx.navigateBack();
  }
});