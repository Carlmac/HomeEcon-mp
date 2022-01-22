import {formatTime} from '../../../../utils/date';
import TIM from 'tim-wx-sdk'

Component({
  properties: {
    message: Object
  },
  observers: {
    'message': function(message) {
      console.log(message);
      message.time = formatTime(message.time);

      this.setData({
        _message: message
      })
    }
  },
  data: {
    TIM: TIM,
    flowEnum: {
      IN: 'in',
      OUT: 'out'
    }
  },
  methods: {}
});
