export default [
    ...[6, 7, 8, 9, 10].map(i => ({
        name: `User ${i}`,
        email: `user${i}@gm.com`,
        password: '12345',
        id: `u${i}`,
        type: 'customer'
    })),
    ...[1, 2, 3, 4, 5].map(i => ({
        name: `Sales Rep ${i}`,
        email: `sales${i}@gm.com`,
        password: '12345',
        id: `s${i}`,
        type: 'sales_rep'
    }))
]