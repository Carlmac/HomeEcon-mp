import Tim from '../../model/tim'
import TIM from 'tim-wx-sdk'

Page({
  data: {},
  onLoad: function (options) {
    const userId = 250000;
    Tim.getInstance().login();
    Tim.getInstance().getSDK().on(TIM.EVENT.SDK_READY, async function () {
      const res = await Tim.getInstance().getMessageList(userId);
    })
  }
});