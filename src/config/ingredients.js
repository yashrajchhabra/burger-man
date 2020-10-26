export default [
    ...[1, 2, 3].reduce((acc, ig) => {
        acc.push(...[
            {
                id: `i-1-${ig}`,
                name: 'Salad',
                dish_id: `d${ig}`,
                cost: 5,
                min_amount: 0,
                max_amount: 1,
                customizable: true
            },
            {
                id: `i-2-${ig}`,
                name: 'Bun',
                dish_id: `d${ig}`,
                cost: 5,
                min_amount: 2,
                customizable: false
            },
            {
                id: `i-3-${ig}`,
                name: 'Cheese',
                dish_id: `d${ig}`,
                cost: 1,
                min_amount: 0,
                max_amount: 4,
                customizable: true
            },
            {
                id: `i-4-${ig}`,
                name: 'Cutlet',
                dish_id: `d${ig}`,
                cost: 2,
                min_amount: 1,
                max_amount: 4,
                customizable: true
            }
        ]);
        return acc;
    }, [])
]