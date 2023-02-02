const {CartRepository} = require("../repositories/basket.repository")

class CartService {
  cartRepository = new CartRepository()

  addMyCart = async (user_id, item_id, count) => {
    return await this.cartRepository.addMyCart(user_id, item_id, count)
  }
}

module.exports = {CartService}