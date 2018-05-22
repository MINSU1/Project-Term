const Connection = require('tedious').Connection;  
const config = {  
    userName: 'Student',  
    password: 'P@ssw0rd',  
    server: 'team8server.database.windows.net',  
    options: {encrypt: true, database: 'Project'}  
}; 
const connection = new Connection(config); 
 

function getIP(){
    connection.on('connect', function(err) {  
    console.log(err); 
    console.log("Connected");  
    })
} 

 

getIP()