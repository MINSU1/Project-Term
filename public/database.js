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

<<<<<<< HEAD
function addMember(data){
    if(addInfo('Member',data)){
        return true
    }
    else {
        return false
    }
}

function removeMember(data){
    if(removeInfo('Member',data)){
        return true
    }
    else {
        return false
    }
}

function get(type){
    getInfo(type).then((message) => {
        console.log(message);
        return listToJson(message)
        
    }).then((json)=>{
        console.log(json);
        return json
    }).catch((error) => {
        console.log('Error:', error);
        return err
    })
    return true
}

function getInfo(info) {
    return new Promise((resolve,reject) => {
        connection.on('connect', function(err) { 
            command = ''
            list = []
            if( info == 'Members'){
                list = [info]
                command = "SELECT * FROM member"
            }
            if( info == 'Orders'){
                list = [info]
                command = "SELECT * FROM order_history"
            }
            request = new Request(command, function(err) {
            if (err) {  
                //console.log(err);
            }  
            });  
            var result = []; 
            request.on('row', function(columns) {  
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
            connection.execSql(request);
        })
    })
}  
function addInfo(type, data) {
    connection.on('connect', function(err) { 
        if( type == 'Member'){
            command = `Insert into member(username, password, line_address, city, zipcode)Values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}')`
            //console.log(command);
        }
        request = new Request(command, function(err) {  
            if (err) {  
                //console.log(err);
            }  
        });  
        connection.execSql(request);
    })
    return true
}
function removeInfo(type, data) { 
    connection.on('connect', function(err) { 
        if( type == 'Member'){
            command = `Delete from member where ${data[0]}='${data[1]}'`
            //console.log(command);
        }
        request = new Request(command, function(err) {  
            if (err) {  
                console.log(err);
            }  
        });  
        connection.execSql(request); 
    })
    return true
=======
function addMember(type, data){
    console.log(data)
    connection.on('connect', function(err) {  
        console.log(err);   
        addInfo(type, data)
    })
}
function removeMember(data){
    connection.on('connect', function(err) {  
        console.log(err);   
        removeInfo('Member', data)
    })
}

function get(type){
    connection.on('connect', function(err) {  
        console.log(err); 
        //console.log("Connected");  
        getInfo(type).then((message) => {
            //console.log(message);
            return listToJson(message)
        }).then((json)=>{
            console.log(json);
            return json
        }).catch((error) => {
            //console.log('Error:', error);
        });
    })
}

function getInfo(info) { 
    return new Promise((resolve,reject) => {
        command = ''
        list = []
        if( info == 'Members'){
            list = [info]
            command = "SELECT * FROM member"
        }
        if( info == 'Orders'){
            list = [info]
            command = "SELECT * FROM order_history"
        }
        request = new Request(command, function(err) {
        if (err) {  
            //console.log(err);
        }  
        });  
        var result = []; 
        request.on('row', function(columns) {  
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
        connection.execSql(request); 
    })
}  
function addInfo(type, data) { 
        if( type == 'Member'){
            command = `Insert into member(username, password, line_address, city, zipcode)Values('${data[0]}','${data[1]}','${data[2]}','${data[3]}','${data[4]}')`
            console.log(command);
        }
        request = new Request(command, function(err) {  
        if (err) {  
            console.log(err);
        }  
        });  
        connection.execSql(request); 
}
function removeInfo(type, data) { 
    command = ''
    if( type == 'Member'){
        command = `Delete from member where ${data[0]}='${data[1]}'`
    }
    request = new Request(command, function(err) {  
    if (err) {  
        console.log(err);
    }  
    });  
    connection.execSql(request); 
>>>>>>> 0ea407d2faa1f211ac5863b532387af15d094ec7
}
function listToJson(list) {
    var newjson = {}
    if(list[0] == 'Members'){
        for (x=1;x<list.length;x++){
            str = `${list[x][2]}, ${list[x][3]}, ${list[x][4]}`
            newjson[list[x][0]] = {
                'password': list[x][1],
                'address': str
            }
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
    return newjson
}

module.exports = {
    listToJson,
    getInfo,
    removeMember,
<<<<<<< HEAD
    addMember,
    get
}
=======
    addMember
}

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

>>>>>>> 0ea407d2faa1f211ac5863b532387af15d094ec7
