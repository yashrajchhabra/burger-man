import dishes from '@/config/dishes';
import ingredients from '@/config/ingredients';

/**
 * @typedef Ingredient
 * @type Object
 *
 * @property {String} id - A unique id of the dish
 * @property {String} name - Name of the dish
 * @property {String} dish_id - Id of the parent dish
 * @property {Number} cost - Cost of the ingredient
 * @property {Number} min_amount - Minimum amount that can be ordered for the ingredient
 * @property {Number} max_amount - Maximum amount that can be ordered for the ingredient
 * @property {Boolean} customizable - Is the ingredient customizable or not
 */

/**
 * @typedef Dish
 * @type Object
 *
 * @property {String} name - Name of the dish
 * @property {String} id - A unique id of the dish
 * @property {String} image - Image url of the dish
 * @property {Array<Ingredient>} ingredients - A colon separated pair of epoch timestamps
 */

/**
 * Helper method to get the active menu
 * @returns {Promise<Array<Dish>>}
 */
export function getDishes() {
    return Promise.resolve(dishes.map(dish => {
        const dishIngredients = ingredients.filter(ingredient => ingredient.dish_id === dish.id);
        const startingFrom = dishIngredients.reduce((acc, ingredient) => {
            if (ingredient.min_amount > 0) {
                acc += (ingredient.cost * ingredient.min_amount);
            }
            return acc;
        }, 0);
        return {
            ...dish,
            ingredients: dishIngredients,
            startingFrom
        };
    }));
}