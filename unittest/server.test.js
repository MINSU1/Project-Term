const database = require('../public/database.js')
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


describe('add and remove form server', ()=>{
	test('can you add a member',()=>{
		//the fuction add a vow to the database and returns true when sucsessfull
		expect(database.addMember(['username', 'password', 'line_address', 'city', 'zipcode'])).toBe(true)
	})
	test('can you remove a member',()=>{
		//the fuction add a vow to the database and returns true when sucsessfull
		expect(database.removeMember(['username','username'])).toBe(true)
	})
})

describe('can you get from the server', ()=>{
	test('get the members from the server',()=>{
		//the fuction saves the result to a database and returns true when sucsessfull
		expect(database.get('Members')).toBe(true)
	})
	test('get the orders from the server',()=>{
		//the fuction saves the result to a database and returns true when sucsessfull
		expect(database.get('Orders')).toBe(true)
	})
})

describe('list to json', ()=>{
	test('members to json',()=>{
		//sample list
		list = [ 'Members',[ 'Jakob', '1234', '8325 hyack drive', 'Vancouver', 'V5S 4H4' ],[ 'Jay', '123', '556 Seymour Street', 'Vancouver', 'V5R B8L' ]]
		//expected output
		json = { Jakob: {
			password: '1234',
			address: '8325 hyack drive, Vancouver, V5S 4H4' },
		Jay:{
			password: '123',
			address: '556 Seymour Street, Vancouver, V5R B8L' }
		}
		expect(String(database.listToJson(list))).toBe(String(json))
	})
	test('members to json',()=>{
		//sample list
		list = [ 'Orders',[ 5,'Theo','2018-04-20T00:00:00.0000000','McDonald','1000 Joyce Street, Vancouver',15]]
		//expected output
		json = String({ '5': {
			'username': 'Theo',
			'date_orderd': '2018-04-20T00:00:00.0000000',
			'restaurant_name':'McDonald',
			'restaurant_address': '1000 Joyce Street, Vancouver',
			'fee':15
		}
	})
		expect(String(database.listToJson(list))).toBe(String(json))
	})
})
