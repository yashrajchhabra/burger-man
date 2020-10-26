import users from '@/config/users';

/**
 * Helper method to help get a list of completed orders
 * @returns {Promise<Array<Cart>>}
 */
export function getOrders() {
    const itemsPurchased = JSON.parse(localStorage.getItem('itemsPurchased')) || [];
    return Promise.resolve(itemsPurchased.map(ip => ({
        ...ip,
        sales_rep_name: users.find(u => u.id === ip.sales_rep_id).name
    })));
}

/**
 * Helper method to place and order
 * @param {Cart} cart - Cart for which to place the order
 * @returns {Promise<void>}
 */
export function placeOrder(cart) {
    const itemsPurchased = JSON.parse(localStorage.getItem('itemsPurchased')) || [];
    itemsPurchased.push(cart);
    localStorage.setItem('itemsPurchased', JSON.stringify(itemsPurchased));
    return Promise.resolve();
}