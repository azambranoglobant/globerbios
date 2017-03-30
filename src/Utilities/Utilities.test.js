const merge = require('./Utilities').merge;
const getDaysDiffFromNow = require('./Utilities').getDaysDiffFromNow;

describe('Merge', () => {
    test('can be required', () => {
        expect(merge).toBeInstanceOf(Function);
    });

    test('two object merging - no collision', function() {
        const firstObject = {name: 'Alan', lastName: 'Zambrano'};
        const secondObject = {age: 28, email: 'alan@mail.com'};

        const expected = Object.assign({}, firstObject, secondObject);
        const result = merge(firstObject, secondObject);

        expect(expected).toEqual(result);
    });

    test('two object merging - props collision', function() {
        const firstObject = {name: 'Alan', lastName: 'Zambrano'};
        const secondObject = {name: 'Leandro', email: 'alan@mail.com'};

        const expected = {name: 'Leandro', lastName: 'Zambrano', email: 'alan@mail.com'};
        const result = merge(firstObject, secondObject);

        expect(expected).toEqual(result);
    });
});

describe('GetDaysDiffFromNow', () => {
    test('can be required', () => {
        expect(getDaysDiffFromNow).toBeInstanceOf(Function);
    });

    test('get correct difference in days ago', () => {
        let daysAgo = 30;

        let dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() - daysAgo);

        let daysDifference = getDaysDiffFromNow(dateOneMonthAgo);
        expect(daysDifference).toBe(daysAgo);

        daysAgo = 15;
        dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() - daysAgo);

        daysDifference = getDaysDiffFromNow(dateOneMonthAgo);
        expect(daysDifference).toBe(daysAgo);
    });

    test('get correct difference in days ahead', () => {
        let daysAhead = 30;

        let dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() + daysAhead);

        let daysDifference = getDaysDiffFromNow(dateOneMonthAgo);
        expect(daysDifference).toBe(daysAhead - 1);

        daysAhead = 15;
        dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(dateOneMonthAgo.getDate() + daysAhead);

        daysDifference = getDaysDiffFromNow(dateOneMonthAgo);
        expect(daysDifference).toBe(daysAhead - 1);
    });
});