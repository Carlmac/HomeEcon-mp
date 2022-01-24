Component({
  properties: {
    flow: String,
    service: Object
  },
  lifetimes: {
    attached() {
      this.setData({
        _service: JSON.parse(this.data.service)
      })
    }
  },
  data: {
    _service: null,
    flowEnum: {
      IN: 'in',
      OUT: 'out'
    }
  },
  methods: {
    handleSendLink() {
      this.triggerEvent('send', {
        service: this.data._service
      })
    },
    handleSelect() {
      this.triggerEvent('select', {
        service: this.data._service
      })
    }
  }
});
