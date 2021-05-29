Page({
  data: {
    tabs: ['全部服务', '在提供', '正在找'],
    currentTabIndex: 0
  },
  onLoad: function (options) {

  },
  handleTabChange: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTabIndex: index
    });
  }
});