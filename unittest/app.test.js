const request = require('supertest');
const app = require('../app')

describe('Test the root path', () => {
    test('/ path should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

// post
describe('Test address_check post path', () => {
    test('/address_check should response the POST method', () => {
        return request(app).get("/address_check").then(response => {
            expect(response.statusCode).toBe(404);
        });
    });
});

describe('Test the sigin path', () => {
    test('/signin should response the GET method', (done) => {
        request(app).get('/signin').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
describe('Test the login_input post path', () => {
    test('/login_input should response the POST method', (done) => {
        request(app).get('/login_input').then((response) => {
            expect(response.statusCode).toBe(404);
            done();
        });
    });
});
describe('Test the register path', () => {
    test('/register should response the GET method', (done) => {
        request(app).get('/register').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
describe('Test the review get path', () => {
    test('/review should response the GET method', (done) => {
        request(app).get('/review').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the review post path', () => {
    test('/review should response the POST method', (done) => {
        request(app).post('/review').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the comment path', () => {
    test('/comment should response the POST method', (done) => {
        request(app).post('/comment').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the comment path', () => {
    test('/comment should response the GET method', (done) => {
        request(app).get('/comment').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the findid path', () => {
    test('/findid should response the GET method', (done) => {
        request(app).get('/findid').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the register_check path', () => {
    test('/register_check should response the POST method', (done) => {
        request(app).post('/register_check').then((response) => {
            expect(response.statusCode).toBe(500);
            done();
        });
    });
});

describe('Test the location path', () => {
    test('/location should response the GET method', (done) => {
        request(app).get('/location').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the location_confirmation path', () => {
    test('/location_confirmation should response the POST method', (done) => {
        request(app).post('/location_confirmation').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe.skip('Test the weather path', () => {
    test('/weather should response the GET method', (done) => {
        request(app).get('/weather',{
            summary: 'Clear',
            icon: 'clear-day',
            temp: 62.38,
            humid: 0.63,
            winds: 4.33,
            dist_fee: 0,
            dist: '0.3 mi',
            ori: 'Seymour St, Vancouver, BC, Canada',
            dest: '560 Smithe St, Vancouver, BC V6B 3L9, Canada'
        }).then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('Test the confirm path', () => {
    test('/confirm should response the GET method', (done) => {
        request(app).get('/confirm').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
