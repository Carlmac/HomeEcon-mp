import Tim from '../../model/tim'

Page({
  data: {},
  onLoad: function (options) {
    const userId = 250000;
    Tim.getInstance().login();
    Tim.getInstance().getMessageList(userId);
  }
});