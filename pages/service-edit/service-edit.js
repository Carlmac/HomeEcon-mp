Page({
  data: {},
  onLoad(options) {
    const service = JSON.parse(options.service);
    this._init(service);
  },

  _init(service) {
    const formData = {
      type: service.type,
      title: service.title,
      category_id: service.category_id,
      cover_image: service.cover_image,
      description: service.description,
      designated_place: service.designated_place,
      begin_date: service.begin_date,
      end_date: service.end_date,
      price: service.price
    }
    this.setData({
      formData
    })
  }
});