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
        return new Promise((resolve,reject)=>{
            console.log(err);   
            return GetInfo('Members').then((message) => {
                //console.log(message);
                return listToJson(message)
            }).then((list)=>{
                //console.log(list);
                resolve(list)
            }).catch((error) => {
                console.log('Error:', error);
            });
        })
    })
} 

function GetInfo(info) { 
    return new Promise((resolve,reject) => {
        command = ''
        if( info == 'Members'){
            command = "SELECT * FROM member"
        }
        if( info == 'Orders'){
            command = "SELECT * FROM order_history"
        }
        request = new Request(command, function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = []; 
        list = [info]
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
    console.log(list[0]);
    if(list[0] == 'Members'){
        for (x=1;x<list.length;x++){
            str = `${list[x][2]}, ${list[x][3]}, ${list[x][4]}`
            newjson[list[x][0]] = {
                'password': list[x][1],
                'address': str
            }
        //console.log(list[item]);
        }
    }
    if(list[0] == 'Orders'){
        for (x=1;x<list.length;x++){
            newjson[list[x][0]] = {
                'username': list[x][1],
                'date_orderd': list[x][2],
                'restaurant_name': list[x][3],
                'restaurant_address': list[x][4],
                'fee':list[x][5]
            }
        }
    }
    //console.log(newjson);
    return newjson
}


module.exports = {
    listToJson,
    GetInfo
}

//commands 
/*
DELETE FROM <table>
WHERE title='<value>'

select <value> from <table>

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
*/

