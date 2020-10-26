import users from '@/config/users';

/**
 * @typedef User
 * @type Object
 *
 * @property {String} name - Name of the user
 * @property {String} id - A unique id of the user
 * @property {String} email - Email of the user
 * @property {String} type - Type of the customer
 */

/**
 * Helper method to help get active sales rep users
 * @returns {Promise<Array<User>>}
 */
export function getSalesReps() {
    return Promise.resolve(users.filter(u => u.type === 'sales_rep'));
}