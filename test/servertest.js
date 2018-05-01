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
        //console.log(message);
        return listToJson(message)
    }).then((list)=>{
        console.log(list);
        return list
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
    var result = []; 
    list = []
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            result.push(column.value);  
          }  
        });  
        //console.log(result);
        list.push(result)
        //console.log(result);
        result =[];
        //console.log(result);
        resolve(list)
    });  
    request.on('done', function(rowCount, more) {  
    //console.log(rowCount + ' rows returned');  
    });
    connection.execSql(request); 
    })
}  

function listToJson(list) {
    var newjson = {}
    for (item in list){
        str = `${list[item][2]}, ${list[item][3]}, ${list[item][4]}`
        newjson[list[item][0]] = {
            'password': list[item][1],
            'address': str
        }
    //console.log(list[item]);
    }
    //console.log(newjson);
    return newjson
}
getData()

