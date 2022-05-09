Component({
  relations: {
    '../grid/grid': {
      type: 'parent',
    }
  },
  properties: {
    icon: String,
    iconSize: {
      type: String,
      value: '50'
    },
    text: String,
    showBadge: Boolean,
    badgeCount: Number,
    cell: Object,
  },
  data: {},
  methods: {
    handleSelect() {
      this.triggerEvent('select',
        {cell: this.data.cell},
      {bubbles: true, composed: true}
      )
    }
  }
});
