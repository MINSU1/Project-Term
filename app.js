/** Calling every module */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser')
const server = require('./public/database.js')
/** Importing js file and its functions */
const weather_file = require('./public/weather.js');

/** serrver stuff */
const Connection = require('tedious').Connection;  
const config = {  
    userName: 'Student',  
    password: 'P@ssw0rd',  
    server: 'team8server.database.windows.net',  
    // If you are on Microsoft Azure, you need this:  
    options: {encrypt: true, database: 'Project'}  
}; 
const connection = new Connection(config); 
const Request = require('tedious').Request;  
const TYPES = require('tedious').TYPES;


function get(type){
	server.doCommand(`SELECT * FROM ${type}`,'getter').then((results)=>{
		list = []
		result = []
		results.forEach(function(row){
			row.forEach(function(value){
				if (typeof value === 'object'){
					result.push(value.value); 
				} 
			});  
			if(result.length > 1){
				list.push(result)
			}
			result =[];
		})
		return [type,server.listToJson([type,list])]
	}).then((list)=>{
		if(list[0]=='member'){
			userlog = list[1]
			//console.log(userlog);
		}
	}).catch((error) => {
        console.log('Error:', error);
    });
}

/** calling express */
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


hbs.registerPartials(__dirname + '/views/partials');

/** declaring hbs */
app.set('view engine', 'hbs');

/** every file other than hbs is in public folder */
app.use(express.static(__dirname + '/public'));
//-----------------------------------------------------------------------------------------------
/** 
 * lat and lng variable will be replaced with the longitude and latitude of the address what user entered
 * 49.2834444' is default lat for simple error handling.
 */ 
var lat = '',
	lng = '',
/** Default Username is Guest, and when the client signin, it will be replaced with the user's name */
	username = 'Guest',
/** 
 * address = address is Client address and dest_address is address of the restaurant
 * dest_address = default addresses are for testing
 * validity = for main_page. become 1 when user type address or signin
 * weather_body = Global variable that stores fetched data from weather.js
 */
	address = '460 Westveiw St, coquitlam, bc, canada',
    dest_address = 'bcit, bc, ca',
	validity = 0
	weather_body = '',
	reviiew = JSON.stringify([{name:'Jay', rating: 5, date: '20170501', comment: 'This app is awesome'}, {name:'Jakob', rating: 1, date: '20170501', comment: 'App is too buggy, the devs suck lol'}]),
	reviews = {'review': reviiew};

/** Global variable that stores fetched data from weather.js user information */
var userlog = {};
var reviews = {};
get('member')
//getReviews()
//---------------------------------------functions-----------------------------------------------
// /** 
//  * Reading JSON file in local storage
//  */

function readJsonFile() {
	get('member')
	get('order_history')
	get('review')
}
/** 
 * based on the address what user entered, find the latitude and longitude, and find the weather in the place
 * @param {string} address - address the user entered
 */
function weather_fetcher(address){
	//console.log(address);
	weather_file.geocode(address).then((result) =>{
		//console.log(result);
		lat = result.lat
		lng = result.lng
		return weather_file.weather(lat, lng);
	}).then((result)=>{
		weather_body = result;
	}).catch((error)=>{
		//console.log(error)
	})
}
//-----------------------------------main page--------------------------------------------------
/** Sending hbs file when cliet enter address */
app.get('/', (request, response) => {
	//console.log(userlog);
    response.render('main', {
    	validity: validity,
    	username: username,
    	address: address,
    });
});

/** This is for Guest input. find wether the adress is available or not */
app.post('/address_check', (request, response) => {
	if(request.body.validity == 1){
		address = request.body.address;
		username = 'Guest'
		response.send('valid');
		weather_fetcher(address);
		validity = 1; // if validity is 1, it means address has been entered
	}else if(request.body.validity == 0){
		validity = 0; // if validity is 0, it means address has not been entered
		response.send('reload');
	}else{
		response.statusCode = 404;
	}
});
//-----------------------------------signin page--------------------------------------------------
/** Simply sending signin.hbs page and read username.json file and store the data */
app.get('/signin', (request, response) => {
	// readJsonFile(__dirname + '/username.json');
    response.render('signin');
});

/** fetch out the login information what user entered and save it into the variable */
app.post('/login_input', (request, response, next) => {
	if (String(request.body.id_input) in userlog && String(request.body.pass_input) == userlog[String(request.body.id_input)].password){
		username = request.body.id_input;
		password = request.body.pass_input;
		validity = request.body.validity;
		address = userlog[username].address;
		weather_fetcher(address);
		response.send('valid');
	}else{
		response.send("invalid");
		response.statusCode = 404;
	}
});

//-------------------------register Page-------------------------------------------------
/** Simply sending register.hbs page */
app.get("/register", (request, response) =>{
	response.render("register");
});

app.get("/review", (request, response)=>{
	response.render("review", {comment:''});
});

app.post("/review", (request, response)=>{
	if(!(request.body.feedback == "")){
		//console.log(request.body);
		response.render('greet');
	}else{
		response.render('review', {comment:'Plesae leave a feedback.'});
	}
});

app.post('/comment', (request, response)=>{
	response.render('comment', reviews);
});

/** Simply sending findid.hbs page */
app.get("/findid", (request, response) =>{
	response.render('findid');
});

/** Go to career page */
app.get("/career", (request, response) =>{
	response.render('career');
});

/** Check whether the address input is valid and store the information into JSON file */
app.post("/register_check", (request, response) =>{
	user_info = request.body;
	//console.log(user_info);
	weather_file.getAddress(user_info.address).then((results)=>{
		//console.log([request.body.username, request.body.password, request.body.address, request.body.city, request.body.zipcode]);
		if(user_info.username in userlog){
			response.send('username already exists');
		}
		else{
			server.addMember([request.body.username, request.body.password, request.body.address, request.body.city, request.body.zipcode]).then(()=>{
				get('member')
				return 'hi'
			}).then(()=>{
				response.send('valid');
			})
			address = String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada";
			lat = JSON.stringify(results.lat, undefined, 2)
			lng = JSON.stringify(results.lng, undefined, 2)		
		}
	});
});

//-----------------------------------location page--------------------------------------------------
/** Simply sending location.hbs page */
app.get('/location', (request, response) => {
    response.render('location', {latitu:lat, longitu:lng});
});

/** take the address information what user picked */
app.post('/location_confirmation', (request, response) => {
	dest_address = request.body.address;
	response.send('valid')
});

//-----------------------------------weather Page-----------------------------------------------------
/** Summary page that displays all the information about weather. */
app.get('/weather', (request, response) => {
	var distance_fee = 0,
		distance = '',
		ori = '',
		dest = '';
	/** function call */
	weather_fetcher(address)
	/** Using distance_calc function in weather.js, it finds out the price to deliver the food */
	weather_file.distance_calc(address, dest_address).then((result)=>{
		distance = result.dis;
		distance_fee = parseInt(result.dis.split(' ')[0])*5;
		ori = result.ori;
		dest = result.dest;
		// response.render('weather', {summary: weather_body.summary,icon:weather_body.icon,temp:weather_body.temperature,humid:weather_body.humidity,winds:weather_body.windSpeed,dist_fee:distance_fee,dist:distance, ori:ori,dest:dest});
		// response.render('weather', {
		// 	summary: weather_body.currently.summary,
		// 	icon:weather_body.currently.icon,
		// 	temp:weather_body.currently.temperature,
		// 	humid:weather_body.currently.humidity,
		// 	winds:weather_body.currently.windSpeed,
		// 	dist_fee:distance_fee,
		// 	dist:distance,
		// 	ori:ori,
		// 	dest:dest
		// });
		//console.log({summary: weather_body.summary,icon:weather_body.icon,temp:weather_body.temperature,humid:weather_body.humidity,winds:weather_body.windSpeed,dist_fee:distance_fee,dist:distance, ori:ori,dest:dest});
		response.render('weather', {summary: weather_body.summary,icon:weather_body.icon,temp:weather_body.temperature,humid:weather_body.humidity,winds:weather_body.windSpeed,dist_fee:distance_fee,dist:distance, ori:ori,dest:dest});
	}).catch((error)=>{
		//console.log(error);
	});
	response.render('weather');
});

//-----------------------------------Confirm Page-----------------------------------------------------
/** Simply sending confirm.hbs page */
app.get('/confirm', (request, response) => {
	response.render('confirm')
});

module.exports = app;