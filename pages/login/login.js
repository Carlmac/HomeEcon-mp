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
      title: '正在授权',
      mask: true
    });
    try {
      await User.login();
      await User.updateUserInfo(res.userInfo);
      wx.navigateBack();
    } catch (e) {
      wx.showModal({
        title: '登录失败，请稍后重试'
      });
      console.log(e);
    }

    wx.hideLoading();
  }
});