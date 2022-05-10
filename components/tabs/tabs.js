import {throttle} from '../../utils/utils'

Component({
  options: {
    multipleSlots: true
  },
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0
    }
  },
  observers: {
    active: function(active) {
      this.setData({
        currentTabIndex: active
      })
    }
  },
  data: {
    currentTabIndex: 0
  },
  methods: {
    handleTabChange: throttle(function(e) {
      const index = e.currentTarget.dataset.index;
      if (index === this.data.currentTabIndex) {return;}
      this.setData({
        currentTabIndex: index
      });

      this.triggerEvent('change', {index})
    }),

    handleTouchMove(e) {
      console.log('move');
      const direction = e.direction;
      const currentTabIndex = this.data.currentTabIndex;
      const targetTabIndex = currentTabIndex + direction;

      if (targetTabIndex < 0 || targetTabIndex > this.data.tabs.length - 1) {
        return;
      }

      const fakeEvent = {
        currentTarget: {
          dataset: {
            index: targetTabIndex
          }
        }
      }

      this.handleTabChange(fakeEvent);
    }
  }
});
