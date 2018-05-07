const server = require('./servertest.js')
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
    connection.on('connect', function(err) {  
        console.log(err); 
        //console.log("Connected");  
        server.getInfo(type).then((message) => {
            return server.listToJson(message)
        }).then((json)=>{
            console.log(json);
            return json
        }).catch((error) => {
            console.log('Error:', error);
        });
    })
}

get('Members')