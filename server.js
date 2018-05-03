const address_finder = require('./address_finder.js')
const weather_file = require('./public/weather.js');
// Calling every module 
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
    if (err){
       console.log(err); 
    }
    //console.log("Connected");  
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


var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//-----------------------------------------------------------------------------------------------
var lat = '49.2834444',
	lng = '-123.1196331',
	username = 'Guest',
	address = '460 Westveiw St, coquitlam, bc, canada',
	dest_address = 'bcit, bc, ca',
	validity = 0,
	weather_body = '';

var userlog = {}
getMembers()
//---------------------------------------functions-----------------------------------------------
function readJsonFile() {
	getMembers()
}
function writeJsonFile(){
	fs.writeFile('./username.json', JSON.stringify(userlog));
}
function weather_fetcher(){
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
			//console.log("latlng_converter Error");
			lat = '49.2834444',
			lng = '-123.1196331';
		} else{
			lat = JSON.stringify(results.lat, undefined, 2)
			lng = JSON.stringify(results.lng, undefined, 2)
		}
	});
}
//-----------------------------------main page--------------------------------------------------
app.get('/', (request, response) => {
	readJsonFile();
    response.render('main', {
    	validity: validity,
    	username: username,
    	address: address
    });
});

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
app.get('/signin', (request, response) => {
	readJsonFile(__dirname + '/username.json');
    response.render('signin');
});

app.post('/login_input', (request, response, next) => {
    username_check = request.body.id_input;
	password_check = request.body.pass_input;
	validity_check = request.body.validity;
	//console.log(String(username_check) in userlog);
	//console.log(userlog[String(username_check)]);
	if (String(username_check) in userlog && String(password_check) == userlog[String(username_check)].password){
		username = username_check;
		password = password_check;
		validity = validity_check;
		address = userlog[username_check].address;
		latlng_converter(address);
		weather_fetcher();
		response.send('valid');
	}else{
		response.send("invalid");
	}
});

//-------------------------register Page-------------------------------------------------
app.get("/register", (request, response) =>{
	response.render("register");
});

app.get("/findid", (request, response) =>{
	response.render('findid');
});

app.post("/register_check", (request, response) =>{
	user_info = request.body;

	address_finder.getAddress(user_info.address, (errorMessage, results) =>{
		if (errorMessage){
			response.send('address invalid')
		}else if(request.body.username in userlog){
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
app.get('/location', (request, response) => {
	//console.log(lat, lng)
    response.render('location', {latitu:lat, longitu:lng});
});

app.post('/location_confirmation', (request, response) => {
	dest_address = request.body.address;
	response.send('valid')
});

//-----------------------------------weather Page-----------------------------------------------------
app.get('/weather', (request, response) => {
	var distance_fee = 0,
		distance = '',
		ori = '',
		dest = '';
	weather_fetcher()
	weather_file.distance_calc(address, dest_address).then((result)=>{
		distance = result.dis;
		distance_fee = parseInt(result.dis.split(' ')[0])*5;
		ori = result.ori;
		dest = result.dest;

		//console.log(weather_body, '!!');
		response.render('weather', {summary: weather_body.summary,icon:weather_body.icon,temp:weather_body.temperature,humid:weather_body.humidity,winds:weather_body.windSpeed,dist_fee:distance_fee,dist:distance, ori:ori,dest:dest});
	}).catch((error)=>{
		console.log(error);
	});
});

//-----------------------------------Confirm Page-----------------------------------------------------
app.get('/confirm', (request, response) => {
	response.render('confirm')
})
//------------------------------app.list to the port--------------------------------------------------
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});