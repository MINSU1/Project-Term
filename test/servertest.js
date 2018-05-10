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
function getData(){
    connection.on('connect', function(err) {  
    // If no error, then good to proceed. 
    console.log(err); 
    console.log("Connected");  
    executeStatement().then((message) => {
        console.log(message);
    }).catch((error) => {
        console.log('Error:', error);
    });
    })
} 

function executeStatement() { 
    return new Promise((resolve,reject) => {
    request = new Request("SELECT * FROM member", function(err) {  
    if (err) {  
        console.log(err);}  
    });  
    var result = ""; 
    list = []
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result+= column.value + " ";  
          }  
        });  
        //console.log(result);
        list.push(result)
        result ="";  
        resolve(list)
    });  
    request.on('done', function(rowCount, more) {  
    //console.log(rowCount + ' rows returned');  
    });
    connection.execSql(request); 
    })
}  

getData()