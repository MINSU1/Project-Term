const request = require('supertest');
const app = require('../address_finder.js')

describe('Test getWeather', () => {
    test('getWeather should return summary, temperature, pressure', () => {
    	app.getWeather(49.2487721,-122.8902314).then((result) =>{
    		expect(result.lat).toBe();
    		expect(result.lng).toBe();
    	});
    });
});

describe('Test the distance calculator', () => {
    test('distance_calc should return the distance between the user and restaurant', () => {
    	app.distance_calc('460 Westveiw St, coquitlam, bc, canada', '1045 haro st, bc, canada').then((result) =>{
    		expect(result.dis).toBe("13.5 mi");
    		expect(result.ori).toBe("460 Westview St, Coquitlam, BC V3K 6C9, Canada");
    	});
    });
});