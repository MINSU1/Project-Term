const regester = require('../public/register.js')

describe('Test the root path', () => {
    test('/ path should response the GET method', (done) => {
        expect(regester.errorTest()).toBe(false);
    });

