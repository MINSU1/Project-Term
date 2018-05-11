var div1 = document.createElement('button')
div1.id = 'submit'

//const regester = require('../public/register.js')


describe.skip('Test the root path', () => {
    test('/ path should response the GET method', (done) => {
        expect(regester.errorTest()).toBe(false);
    });
})

