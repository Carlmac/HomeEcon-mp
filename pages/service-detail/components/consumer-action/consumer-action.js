import serviceType from '../../../../enum/service-type';
import behavior from '../behavior'

Component({
  behaviors: [behavior],
  properties: {},
  data: {
    serviceTypeEnum: serviceType
  },
  methods: {
    handleChat(e) {
      this.triggerEvent('chat')
    },
    handleOrder(e) {
      this.triggerEvent('order')
    }
  }
});
