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

function getData(){
    connection.on('connect', function(err) {  
        // If no error, then good to procee
        console.log(err);   
        return server.GetInfo('Members').then((message) => {
            return server.listToJson(message)
        }).then((list)=>{
        	console.log(list);
        }).catch((error) => {
            console.log('Error:', error);
        });
    })
}

getData()