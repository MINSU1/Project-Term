// Calling every module 
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser')

// Importing js file and its functions
const address_finder = require('./address_finder.js')
const weather_file = require('./public/weather.js');

// calling express
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// port can be 8080 or the port for Heroku
const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

// declaring hbs
app.set('view engine', 'hbs');

// every file other than hbs is in public folder
app.use(express.static(__dirname + '/public'));
//-----------------------------------------------------------------------------------------------
// var lat = '49.2834444',
//     lng = '-123.1196331'
var username = 'Guest',
    address = '',
    // dest_address = 'bcit, bc, ca',
    validity = 0
    // weather_body = '';

//var userlog = { jay: { password: "123", address: "204-460 Westview St, Coquitlam, BC, Canada" }, min: { password: "123", address: "minsu st, vancouver, BC, Canada" } };
// lat and lng variable will be replaced with the longitude and latitude of the address what user entered
// '49.2834444' is default lat for simple error handling.
var lat = '49.2834444',
	lng = '-123.1196331',
// Default Username is Guest, and when the client signin, it will be replaced with the user's name
	username = 'Guest',
// address is Client address and dest_address is address of the restaurant 
// default addresses are for testing
	address = '460 Westveiw St, coquitlam, bc, canada',
	dest_address = 'bcit, bc, ca',
// Will be explained later
	validity = 0,
// Global variable that stores fetched data from weather.js
	weather_body = '';

// user information 
var userlog = {jay:{password:"123",address:"204-460 Westview St, Coquitlam, BC, Canada"},min:{password:"123",address:"minsu st, vancouver, BC, Canada"}};
//---------------------------------------functions-----------------------------------------------
// Reading JSON file in local storage
function readJsonFile() {
    fs.readFile('./username.json', (err, data) => {
        if (err) {
            throw err;
        }
        userlog = JSON.parse(data);
        //console.log(userlog);
    });
}
function writeJsonFile() {
    fs.writeFile('./username.json', JSON.stringify(userlog));
}
function weather_fetcher() {
    weather_file.geocode(address).then((result) => {
        return weather_file.weather(result.lat, result.lng);
    }).then((result) => {
        weather_body = result;
    }).catch((error) => {
        console.log(error)
    })
}

function latlng_converter(address) {
    address_finder.getAddress(address, (errorMessage, results) => {
        if (errorMessage) {
            console.log("latlng_converter Error");
            lat = '49.2834444',
                lng = '-123.1196331';
        } else {
            lat = JSON.stringify(results.lat, undefined, 2)
            lng = JSON.stringify(results.lng, undefined, 2)
        }
    });
}

// Writing JSON file in local storage
function writeJsonFile(){
	fs.writeFile('./username.json', JSON.stringify(userlog));
}

// based on the address what user entered, find the latitude and longitude, and find the weather in the place 
function weather_fetcher(address){
	weather_file.geocode(address).then((result) =>{
		lat = result.lat
		lng = result.lng
		return weather_file.weather(lat, lng);
	}).then((result)=>{
		weather_body = result;
	}).catch((error)=>{
		console.log(error)
	})
}
//-----------------------------------main page--------------------------------------------------
// Sending hbs file when cliet enter address
app.get('/', (request, response) => {
    readJsonFile();
    response.render('main', {
        validity: validity,
        username: username,
        address: address
    });
});

// This is for Guest input. find wether the adress is available or not
app.post('/address_check', (request, response) => {
    address = request.body.address;

    if (request.body.validity == 1) {
        address_finder.getAddress(address, (errorMessage, results) => {
            if (errorMessage) {
                response.send('invalid');
            } else {
                lat = JSON.stringify(results.lat, undefined, 2)
                lng = JSON.stringify(results.lng, undefined, 2)

                response.send('valid');
                weather_fetcher();
                validity = 1;
            }
        });
    } else if (request.body.validity == 0) {
        validity = 0;
        response.send('reload');
    }
	address = request.body.address;
	username = 'Guest'
	if(request.body.validity == 1){
		response.send('valid');
		weather_fetcher(address);
		validity = 1; // if validity is 1, it means address has been entered
	}else if(request.body.validity == 0){
		validity = 0; // if validity is 0, it means address has not been entered
		response.send('reload');
	}
});
//-----------------------------------signin page--------------------------------------------------
// Simply sending signin.hbs page and read username.json file and store the data
app.get('/signin', (request, response) => {
    readJsonFile(__dirname + '/username.json');
    response.render('signin');
});

// fetch out the login information what user entered and save it into the variable
app.post('/login_input', (request, response, next) => {
    username_check = request.body.id_input;
    password_check = request.body.pass_input;
    validity_check = request.body.validity;
    console.log(String(username_check) in userlog);
    console.log(userlog[String(username_check)]);
    if (String(username_check) in userlog && String(password_check) == userlog[String(username_check)].password) {
        username = username_check;
        password = password_check;
        validity = validity_check;
        address = userlog[username_check].address;
        latlng_converter(address);
        weather_fetcher();
        response.send('valid');
    } else {
        response.send("invalid");
    }
});

//-------------------------register Page-------------------------------------------------
app.get("/register", (request, response) => {
    response.render("register");
});

app.get("/findid", (request, response) => {
    response.render('findid');
});

app.post("/register_check", (request, response) => {
    user_info = request.body;

    address_finder.getAddress(user_info.address, (errorMessage, results) => {
        if (errorMessage) {
            response.send('address invalid')
        } else if (request.body.username in userlog) {
            response.send('username invalid');
        } else {
            userlog[String(user_info.username)] = { password: String(user_info.password), address: String(user_info.address) + ', ' + String(user_info.city) + ", " + "BC" + ", " + "Canada" };
            address = String(user_info.address) + ', ' + String(user_info.city) + ", " + "BC" + ", " + "Canada";
            lat = JSON.stringify(results.lat, undefined, 2)
            lng = JSON.stringify(results.lng, undefined, 2)

            console.log(userlog)
            writeJsonFile();
            response.send('valid');

        }
    });
	if (String(request.body.id_input) in userlog && String(request.body.pass_input) == userlog[String(request.body.id_input)].password){
		username = request.body.id_input;
		password = request.body.pass_input;
		validity = request.body.validity;
		address = userlog[username].address;
		weather_fetcher(address);
		response.send('valid');
	}else{
		response.send("invalid");
	}
});

//-------------------------register Page-------------------------------------------------
// Simply sending register.hbs page
app.get("/register", (request, response) =>{
	response.render("register");
});

// Simply sending findid.hbs page
app.get("/findid", (request, response) =>{
	response.render('findid');
});

// Check whether the address input is valid and store the information into JSON file
app.post("/register_check", (request, response) =>{
	user_info = request.body;

	address_finder.getAddress(user_info.address, (errorMessage, results) =>{
		if (errorMessage){
			response.send('address invalid')
		}else if(user_info.username in userlog){
			response.send('username invalid');
		}else{
			userlog[String(user_info.username)]= {password:String(user_info.password),address:String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada"};
			address = String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada";
			lat = JSON.stringify(results.lat, undefined, 2)
			lng = JSON.stringify(results.lng, undefined, 2)
			writeJsonFile();
			response.send('valid');
		}
	});
});

//-----------------------------------location page--------------------------------------------------
// Simply sending location.hbs page
app.get('/location', (request, response) => {
    console.log(lat, lng)
    response.render('location', { latitu: lat, longitu: lng });
    response.render('location', {latitu:lat, longitu:lng});
});

// take the address information what user picked
app.post('/location_confirmation', (request, response) => {
    dest_address = request.body.address;
    response.send('valid')
});

//-----------------------------------weather Page-----------------------------------------------------
// Summary page that displays all the information about weather.
app.get('/weather', (request, response) => {
    var distance_fee = 0,
        distance = '',
        ori = '',
        dest = '';
    weather_fetcher()
    weather_file.distance_calc(address, dest_address).then((result) => {
        distance = result.dis;
        distance_fee = parseInt(result.dis.split(' ')[0]) * 5;
        ori = result.ori;
        dest = result.dest;

        console.log(weather_body, '!!');
        response.render('weather', { summary: weather_body.summary, icon: weather_body.icon, temp: weather_body.temperature, humid: weather_body.humidity, winds: weather_body.windSpeed, dist_fee: distance_fee, dist: distance, ori: ori, dest: dest });
    }).catch((error) => {
        console.log(error);
    });
	var distance_fee = 0,
		distance = '',
		ori = '',
		dest = '';
	// function call
	weather_fetcher(address)
	// Using distance_calc function in weather.js, it finds out the price to deliver the food 
	weather_file.distance_calc(address, dest_address).then((result)=>{
		distance = result.dis;
		distance_fee = parseInt(result.dis.split(' ')[0])*5;
		ori = result.ori;
		dest = result.dest;
		response.render('weather', {summary: weather_body.summary,icon:weather_body.icon,temp:weather_body.temperature,humid:weather_body.humidity,winds:weather_body.windSpeed,dist_fee:distance_fee,dist:distance, ori:ori,dest:dest});
	}).catch((error)=>{
		console.log(error);
	});
});

//-----------------------------------Confirm Page-----------------------------------------------------
// Simply sending confirm.hbs page
app.get('/confirm', (request, response) => {
    response.render('confirm')
})
//------------------------------app.list to the port--------------------------------------------------
// listening assigned port 
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});