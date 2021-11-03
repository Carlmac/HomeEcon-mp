import serviceType from '../../enum/service-type'
import {getDataSet, getEventParam} from '../../utils/utils'
import Category from '../../model/category'

Component({
  properties: {
    form: Object
  },
  data: {
    typeList: [
      {
        id: serviceType.PROVIDE,
        name: '提供服务'
      },
      {
        id: serviceType.SEEK,
        name: '找服务'
      }
    ],
    typePickerIndex: null,
    categoryList: [],
    categoryPickerIndex: null,
    files: [],
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image_id: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_date: '',
      price: ''
    }
  },
  lifetimes: {
    attached() {
      this._init()
    }
  },
  methods: {
    async _init() {
      const typePickerIndex = this.data.typeList.findIndex((type) => this.data.form.type === type.id);
      const categoryList = await Category.getCategoryList()
      const categoryPickerIndex = categoryList.findIndex((item) => this.data.form.category_id === item.id)
      this.setData({
        categoryList,
        categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
        typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
        files: this.data.form.cover_image ? [this.data.form.cover_image] : [],
        formData: {
          type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image ? this.data.form.cover_image.id : null,
          description: this.data.form.description,
          designated_place: this.data.form.designated_place,
          begin_date: this.data.form.begin_date,
          end_date: this.data.form.end_date,
          price: this.data.form.price
        }
      })
    },

    submit() {
      console.log(this.data.formData)
    },

    handleTypeChange(event) {
      const index = getEventParam(event, 'value')
      this.setData({
        typePickerIndex: index,
        ['formData.type']: this.data.typeList[index].id
      })
    },

    handleInput(event) {
      const value = getEventParam(event, 'value')
      const field = getDataSet(event, 'field')
      this.setData({
        [`formData.${field}`]: value
      })
    },

    handleCategoryChange(event) {
      const index = getEventParam(event, 'value')
      this.setData({
        categoryPickerIndex: index,
        [`formData.category_id`]: this.data.categoryList[index].id
      })
    },

    handleSwitchChange(event) {
      const res = getEventParam(event, 'value')
      this.setData({
        [`formData.designated_place`]: res
      })
    },

    handleBeginDateChange(event) {
      const beginDate = getEventParam(event, 'value')
      this.setData({
        [`formData.begin_date`]: beginDate
      })
    },
    handleEndDateChange(event) {
      const endDate = getEventParam(event, 'value')
      this.setData({
        [`formData.end_date`]: endDate
      })
    },

    handleUploadSuccess(event) {
      console.log(event)
      const id = event.detail.files[0].id
      this.setData({
        ['formData.cover_image_id']: id
      })
    }
  }
});
