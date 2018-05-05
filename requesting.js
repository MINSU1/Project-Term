const request = require('request');
import address_input from "./public/main.js";

var address = address_input;

var getAddress = (callback) => {
	request({
	    url: 'http://maps.googleapis.com/maps/api/geocode/json' +
	        '?address=' + encodeURIComponent(address),
	    json: true
	}, (error, response, body) => {
		if (error){
			callback('Cannot connect to Google Maps');
		}else if (body.status == 'ZERO_RESULTS'){
			callback('Cannot find requested address');
		}else if (body.status == 'OK'){
			callback(undefined, {
				lat: body.results[0].geometry.location.lat,
				lng: body.results[0].geometry.location.lng
			})
		}
	});
};

var getWeather = (lat, lng, callback) => {
	request({
	    url: 'https://api.darksky.net/forecast/fb2d78ddaa5b88137bda186278187c8d/'+lat+','+lng,
	    json: true
	}, (error, response, body) => {
		if (error){
			callback('Cannot connect to Darksky.net');
			//console.log('Cannot connnect to Google Maps');
		}else if(body.code == 400){
			callback('Cannot find weather form the address');
			//console.log('Cannot find requested address');
		}else{
			callback(undefined, {
				icon: `icon: ${body.currently.icon}`,
				summary: `Summary: ${body.currently.summary}`,
				temperature: `Temperature: ${body.currently.temperature} °F`,
				pressure: `Pressure: ${body.currently.pressure}`
			});
		}
	});
};

asyncAdd(5, 10).then((result) => {
	console.log('Result:', result);
	return asyncAdd(result, 33);
}).then((result)=>{
	console.log('Result:', result);
}).catch((error)=>{
	console.log("Error:", error);
});