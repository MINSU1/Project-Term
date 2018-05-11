const request = require('supertest');
const app = require('../public/weather.js')

describe('Test the address to lat/lng converter', () => {
    test('geocode should return lat and lng of the address', () => {
    	app.geocode('460 Westveiw St, coquitlam, bc, canada').then((result) =>{
    		expect(result.lat).toBe(49.2487721);
    		expect(result.lng).toBe(-122.8902314);
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