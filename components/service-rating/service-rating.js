Component({
  properties: {
    rating: {
      type: Object
    }
  },
  data: {},
  methods: {
    handlePreview: function(event) {
      const index = event.target.dataset.index;
      wx.previewImage({
        urls: this.data.rating.illustration,
        current: this.data.rating.illustration[index]
      })
    }
  }
});
