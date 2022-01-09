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
    });
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings();
  },
});