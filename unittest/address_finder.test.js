const request = require('supertest');
const app = require('../address_finder.js')

// describe('Test getWeather', () => {
//     test('getWeather should return summary, temperature, pressure', () => {
//     	app.getWeather(49.2487721,-122.8902314).then((result) =>{
//     		expect(result.lat).toBe();
//     		expect(result.lng).toBe();
//     	});
//     });
// });

describe('Test getting address', () => {
    test('getAddress should return the distance between the user and restaurant', () => {
    	app.getAddress("460 Westview St, Coquitlam, BC V3K 6C9, Canada").then((result) =>{
    		equal(result.lat, 49.2487721);
    		equal(result.lng, -122.8902314);
    	});
    });
});