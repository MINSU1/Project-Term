const Connection = require('tedious').Connection;  
const config = {  
	userName: 'Student',  
	password: 'P@ssw0rd',  
	server: 'team8server.database.windows.net',    
	options: {encrypt: true, database: 'Project'}  
}; 
const connection = new Connection(config); 
const Request = require('tedious').Request;  
const TYPES = require('tedious').TYPES;

/////////////////////
var items = null
var ConnectionPool = require('tedious-connection-pool');

var poolConfig = {
	min: 0,
	max: 100,
	log: true
};

//create the pool
var pool = new ConnectionPool(poolConfig, config);

pool.on('error', function(err) {
	console.error(err);
});

//acquire a connection
function doCommand(command, type){
	return new Promise((resolve,reject) => {
		pool.acquire(function (err, connection) {
			if (err) {
				console.error(err);
				return;
			}
			//use the connection as normal
			var request = new Request(command, function(err, rowCount) {
				if (err) {
					console.error(err);
					return;
				}
				//release the connection back to the pool when finished
				connection.release();

			});
			// return info if needed
			list = []
			result = []
			if (type == 'getter'){
				request.on('row', function(columns) {  
					list.push(columns)
					resolve(list)
				});
				list = []
				result = []
			}
			connection.execSql(request);
		})
	})
}
/////////////////////
function addMember(data){
	return new Promise((resolve,reject) => {
		command = `Insert into member(username, password, line_address, city, zipcode)Values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}')`
		doCommand(command,'adder')
		resolve('done')
	})
}
function removeMember(data){
	return new Promise((resolve,reject) => {
		command = `DELETE FROM review WHERE username = ${data}`
		doCommand(command,'remover').then(()=>{
			command = `DELETE FROM order_history WHERE username = ${data}`
			doCommand(command,'remover')
		}).then(()=>{
			command = `DELETE FROM member WHERE username = ${data};`
			doCommand(command,'remover')
		}).then(()=>{
			resolve('done')
		})
		
	})
}
function get(type){
	doCommand(`SELECT * FROM ${type}`,'getter').then((results)=>{
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
		console.log(list);
		return results;
	}).catch((error) => {
        console.log('Error:', error);
    });
}

function listToJson(list) {
	oldList = list[1]
	var newjson = {}
	if(list[0]== 'member'){
		for (x=0;x<oldList.length;x++){
			str = `${oldList[x][2]}, ${oldList[x][3]}, ${oldList[x][4]}`
			newjson[oldList[x][0]] = {
				'password': oldList[x][1],
				'address': str
			}
		}
	}
	else if(list[0] == 'order_history'){
		for (x=0;x<oldList.length;x++){
			newjson[oldList[x][0]] = {
				'username': oldList[x][1],
				'date_orderd': oldList[x][2],
				'restaurant_name': oldList[x][3],
				'restaurant_address': oldList[x][4],
				'fee':oldList[x][5]
			}
		}
	}
	return newjson
}
module.exports = {
	listToJson,
	removeMember,
	addMember,
	doCommand
}
