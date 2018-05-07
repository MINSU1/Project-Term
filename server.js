const address_finder = require('./address_finder.js')
const weather_file = require('./public/weather.js');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');
const bodyParser = require('body-parser')
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

/////////////////////////////////////////////////////////////// 
function getMembers(){
    connection.on('connect', function(err) {  
    // If no error, then good to proceed. 
    console.log(err); 
    console.log("Connected");  
    executeStatement().then((message) => {
        //console.log(message);
        return message
    }).then((list)=>{
        var newjson = {}
        for (item in list){
            str = `${list[item][2]}, ${list[item][3]}, ${list[item][4]}`
            newjson[list[item][0]] = {
                'password': list[item][1],
                'address': str
            }
        }
        userlog = newjson
        //console.log(userlog);
        return newjson
    }).catch((error) => {
        console.log('Error:', error);
    });
    })
} 

function executeStatement() { 
    return new Promise((resolve,reject) => {
    request2 = new Request("SELECT * FROM member", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = []; 
    list = []
    request2.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            //console.log('NULL');  
          } else {  
            result.push(column.value);  
          }  
        });  
        list.push(result)
        result =[];
        resolve(list)
    });  
    request2.on('done', function(rowCount, more) {  
    //console.log(rowCount + ' rows returned');  
    });
    connection.execSql(request2); 
    })
}  
///////////////////////////////////////////////////////////////


/** calling express */
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


/** port can be 8080 or the port for Heroku */
const port = process.env.PORT || 8080;

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
	address = '',
    dest_address = '',
	validity = 0
	weather_body = '',
	reviews = {'review': []};

/** Global variable that stores fetched data from weather.js user information */
var userlog = {};
getMembers()
//---------------------------------------functions-----------------------------------------------
/** 
 * Reading JSON file in local storage
 */
function readJsonFile() {
	getMembers()
}
/** 
 * Writing JSON file in local storage
 */
function writeJsonFile(){
	fs.writeFile('./username.json', JSON.stringify(userlog));
}
/** 
 * based on the address what user entered, find the latitude and longitude, and find the weather in the place
 * @param {string} address - address the user entered
 */
function weather_fetcher(address){
	weather_file.geocode(address).then((result) =>{
		return weather_file.weather(result.lat, result.lng);
	}).then((result)=>{
		weather_body = result;
	}).catch((error)=>{
		console.log(error)
	})
}
function latlng_converter(address){
	address_finder.getAddress(address, (errorMessage, results) =>{
		if (errorMessage){
			console.log("latlng_converter Error");
			lat = '',
			lng = '';
		} else{
			lat = JSON.stringify(results.lat, undefined, 2)
			lng = JSON.stringify(results.lng, undefined, 2)
		}
	});
}
//-----------------------------------main page--------------------------------------------------
/** Sending hbs file when cliet enter address */
app.get('/', (request, response) => {
	readJsonFile();
    response.render('main', {
    	validity: validity,
    	username: username,
    	address: address,
    });
});

/** This is for Guest input. find wether the adress is available or not */
app.post('/address_check', (request, response) => {
	address = request.body.address;

	if(request.body.validity == 1){
		address_finder.getAddress(address, (errorMessage, results) =>{
			if (errorMessage){
				response.send('invalid');
			} else{
				lat = JSON.stringify(results.lat, undefined, 2)
				lng = JSON.stringify(results.lng, undefined, 2)
				
				response.send('valid');
				weather_fetcher();
				validity = 1;
			}
		});
	}else if(request.body.validity == 0){
		validity = 0;
		response.send('reload');
	}
});
//-----------------------------------signin page--------------------------------------------------
/** Simply sending signin.hbs page and read username.json file and store the data */
app.get('/signin', (request, response) => {
	readJsonFile(__dirname + '/username.json');
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
	}
});

//-------------------------register Page-------------------------------------------------
/** Simply sending register.hbs page */
app.get("/register", (request, response) =>{
	response.render("register");
});


app.get("/review", (request, response)=>{
	response.render("review", {comment:''});
})

app.post("/review", (request, response)=>{
	if(!(request.body.feedback == "")){
		response.render('greet');
	}else{
		response.render('review', {comment:'Plesae leave a feedback.'});
	}
	
})

app.post('/comment', (request, response)=>{
	console.log(reviews);
	response.render('comment', reviews);
})

/** Simply sending findid.hbs page */
app.get("/findid", (request, response) =>{
	response.render('findid');
});


/** Check whether the address input is valid and store the information into JSON file */
app.post("/register_check", (request, response) =>{
	user_info = request.body;

	address_finder.getAddress(user_info.address, (errorMessage, results) =>{
		if (errorMessage){
            response.send('address invalid');
		}else if(user_info.username in userlog){
			response.send('username invalid');
		}else{
			userlog[String(user_info.username)]= {password:String(user_info.password),address:String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada"};
			address = String(user_info.address)+', '+ String(user_info.city) +", "+ "BC" +", "+"Canada";
			lat = JSON.stringify(results.lat, undefined, 2)
			lng = JSON.stringify(results.lng, undefined, 2)

			//console.log(userlog)
			writeJsonFile();
			response.send('valid');
	   		
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
		response.render('weather', {summary: weather_body.summary,
            icon:weather_body.icon,
            temp:parseFloat(Math.round(weather_body.temperature-32)*(5/9)).toFixed(2),
            humid:weather_body.humidity,
            winds:weather_body.windSpeed,
            dist_fee:distance_fee,
            dist:distance,
            ori:ori,
            dest:dest});
	}).catch((error)=>{
		console.log(error);
	});
});

//-----------------------------------Confirm Page-----------------------------------------------------
/** Simply sending confirm.hbs page */
app.get('/confirm', (request, response) => {
	response.render('confirm')
})
//------------------------------app.list to the port--------------------------------------------------
/** listening assigned port */
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});