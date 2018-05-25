const request = require('request');

var geocode = (address) => {
    return new Promise((resolve, reject) => {
		request({
		    url: 'http://maps.googleapis.com/maps/api/geocode/json' +
		        '?address=' + encodeURIComponent(address),
		    json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Google Maps');
			}else if (body.status == 'ZERO_RESULTS'){
				reject('Cannot find requested address');
			}else if (body.status == 'OK'){
				//console.log(body.results[0]);
				resolve({
					lat: body.results[0].geometry.location.lat,
					lng: body.results[0].geometry.location.lng
				})
			}
		});
	});
};

var getAddress = (address, callback) => {
    return new Promise((resolve, reject)=>{
    	request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
        json: true
		}, (error, response, body) => {
	        if (error) {
	            console.log('Can not connect to google maps');
	        } else if (body.status === 'ZERO_RESULTS') {
	            console.log('Can not find requested address');
	        } else if (body.status === 'OK') {
	        	resolve({
	        		'Your requested venue': address,
	        		'Address': body.results[0].formatted_address,
	        		'Type': body.results[0].types[0]
	        	})
	        }
		})
	})
}

var weather = (lat, lng) => {
	return new Promise((resolve, reject)=> {
		request({
		    url: 'https://api.darksky.net/forecast/fb2d78ddaa5b88137bda186278187c8d/'+lat+','+lng,
		    json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Darksky.net');
			}else if(body.code == 400){
				reject('Cannot find weather form the address');
			}else{
				resolve(body);
			}
		});
	});
};

var distance_calc = (pointa, pointb) => {
	return new Promise((resolve, reject)=> {
		request({
		    url: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+encodeURIComponent(pointa)+",DC&destinations="+encodeURIComponent(pointb)+",NY&key=AIzaSyCHXWx_trBSkgcp7PIEBrmNGI2_vAoKSuA",
		    json: true
		}, (error, response, body) => {
			if (error){
				reject('Cannot connect to Darksky.net');
			}else if(body.code == 400){
				reject('Cannot find weather form the address');
			}else{
				if (body.rows[0].elements[0].status == "NOT_FOUND"){
					reject(body);
				}else{
					resolve({
						dis:body.rows[0].elements[0].distance.text,
						ori:body.origin_addresses[0],
						dest:body.destination_addresses[0]
					});
				}
			}
		});
	});
}

var fah_to_cel = (the_num) => {
	next_num=parseFloat(Math.round((the_num-32)/1.8)).toFixed(2)
	return next_num
}


module.exports = {
	geocode,
	weather,
	distance_calc,
	getAddress,
	fah_to_cel
}