export const usePriceService = () => {
    /**
     * Helper method to calculate the cost of a given dish
     * @param {Object} dish - Dish with the array of ingredients
     * @returns {*|number} cost - Computed cost of the dish
     */
    const getDishCost = dish => {
        return dish?.ingredients?.reduce((sum, ingredient) =>
            sum += ingredient.orderedAmount * ingredient.cost, 0) || 0;
    };

    /**
     * Helper method to get total of a given cart object
     * @param {Object} cart - Cart object with an array of cart items
     * @returns {*}
     */
    const getCartTotal = cart => {
        return cart?.items?.reduce((sum, item) => {
            sum += getDishCost(item);
            return sum;
        }, 0) || 0;
    };

    return {
        getDishCost,
        getCartTotal
    };
}