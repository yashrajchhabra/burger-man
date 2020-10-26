/**
 * @typedef Cart
 * @type Object
 *
 * @property {String} id - A unique id of the cart
 * @property {Array<Dish>} items - A list of dishes ordered
 * @property {String} sales_rep_id - A unique id of the sales rep
 */

/**
 * Helper method to get the active cart
 * @returns {Promise<Cart>}
 */
export function getCart() {
    return Promise.resolve(JSON.parse(localStorage.getItem('cart')));
}

/**
 * Helper method to update the cart
 * @param {Cart|null} cart
 * @returns {Promise<void>}
 */
export function updateCart(cart = null) {
    localStorage.setItem('cart', JSON.stringify(cart));
    return Promise.resolve();
}