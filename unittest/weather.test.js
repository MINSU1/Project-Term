const request = require('supertest');
// const app = require('../app')
const app = require('../public/weather.js')

// describe('Test the weather_fetcher', () => {
//     test('weather_fetcher should return lat and lng of the address', (done) => {
//         request(app).get('/').then((response) => {
//             expect(response.statusCode).toBe(200);
//             done();
//         });
//     });
// });

describe('Test the weather_fetcher', () => {
    test('weather_fetcher should return lat and lng of the address', (done) => {
    	app.geocode('460 Westveiw St, coquitlam, bc, canada').then((result) =>{
    		expect(result.lat).toBe(49.2487721);
    		// expect(result.lng).toBe(-122.8902314);
    	});
    });
});

// setTimeout(function(){
// 	describe('Test the weather_fetcher', () => {
// 	    test('weather_fetcher should return lat and lng of the address', (done) => {
// 	    	app.geocode('460 Westveiw St, coquitlam, bc, canada').then((result) =>{
// 	    		expect(result.lat).toBe(49.2487721);
// 	    		expect(result.lng).toBe(-122.8902314);
// 	    	});
// 	    });
// 	});
// }, 10000);