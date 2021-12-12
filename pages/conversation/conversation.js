// import Tim from '../../model/tim'
// import TIM from 'tim-wx-sdk'
import {createStoreBindings} from 'mobx-miniprogram-bindings'
import { timStore } from '../../store/tim'

Page({
  data: {},
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store: timStore,
      fields: ["sdkReady"],
      actions: ["login"],
    });

    this.login();
    // const userId = 250000;
    // Tim.getInstance().login();
    // Tim.getInstance().getSDK().on(TIM.EVENT.SDK_READY, async function () {
    //   const res = await Tim.getInstance().getMessageList(userId);
    // })
  }
});