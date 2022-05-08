import Http from '../utils/http'

class Order {
  static createOrder(serviceId, address) {
    return Http.request({
      url: 'v1/order',
      data: {
        service_id: serviceId,
        address
      },
      method: 'POST'
    })
  }

  static getOrderStatus(role) {
    return Http.request({
      url: `v1/order/count?role=${role}`,
    })
  }
}

export default Order;