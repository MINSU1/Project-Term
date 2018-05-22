const request = require('jest');
const app = require('../public/weather.js')

describe('Test the address to lat/lng converter', () => {
    test('geocode should return lat and lng of the address', () => {
    	app.geocode('460 Westveiw St, coquitlam, bc, canada').then((result) =>{
    		expect(result.lat).toBe(49.2487721);
    		expect(result.lng).toBe(-122.8902314);
            expect(result.lat).toBeType("number");
            expect(result.lng).toBeType("number");
    	});
    });
});

describe('Test the distance calculator', () => {
    test('distance_calc should return the distance between the user and restaurant', () => {
    	app.distance_calc('460 Westveiw St, coquitlam, bc, canada', '1045 haro st, bc, canada').then((result) =>{
    		expect(result.dis).toBe("13.5 mi");
    		expect(result.ori).toBe("460 Westview St, Coquitlam, BC V3K 6C9, Canada");
    		expect(result.dest).toBe("1045 Haro St, Vancouver, BC V6E 3Z8, Canada");
    	});
    });
});

describe('Test the weather', () => {
    test('weather should return the body.currently', () => {
    	app.weather(49.2487721, -122.8902314).then((result) =>{
    		expect(result.timezone).toBe("America/Vancouver");
            expect(result.timezone).toBeType("string");
            expect(result.currently.summary).toBeType("string");
    		expect(result.offset).toBe(-7);
            expect(result.offset).toBeType("number");
    	});
    });
});