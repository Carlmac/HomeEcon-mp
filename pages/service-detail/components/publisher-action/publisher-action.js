import serviceStatus from '../../../../enum/service-status'
import serviceAction from '../../../../enum/service-action'
import behavior from '../behavior'
import {getDataSet} from '../../../../utils/utils'

Component({
  behaviors: [behavior],
  properties: {},
  data: {
    serviceStatusEnum: serviceStatus,
    serviceActionEnum: serviceAction
  },
  methods: {
    handleUpdateStatus(e) {
      const action = getDataSet(e, 'action');
      this.triggerEvent('update', {action});
    },
    handleEditService() {
      this.triggerEvent('edit');
    }
  }
});
