Component({
  options: {
    multipleSlots: true
  },
  relations: {
    '../grid-item/grid-item': {
      type: 'child',
    }
  },
  properties: {
    rowNum: {
      type: Number,
      value: 3,
    },
    title: String,
    extend: String,
  },
  data: {},
  lifetimes: {},
  methods: {
    getGridItems() {
      const items = this.getRelationNodes('../grid-item/grid-item');
      const gridItems = items.map((item, index) => {
        return {
          index,
        }
      });
      this.setData({
        gridItems,
      })
    }
  }
});
