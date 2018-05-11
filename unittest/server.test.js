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
		expect(database.addMember('Member',['username', 'password', 'line_address', 'city', 'zipcode'])).toBe(undefined)
	})
	test('can you remove a member',()=>{
		expect(database.removeMember(['username','username'])).toBe(undefined)
	})
})

describe('can you get from the server', ()=>{
	test('get the members from the server',()=>{
		userlog = database.get('Members')
		expect(userlog).toBe({
			Jakob:{
			   	password: '1234',
			    address: '8325 hyack drive, Vancouver, V5S 4H4' },
			Jay:{
			   	password: '123',
			    address: '556 Seymour Street, Vancouver, V5R B8L' },
			Le:{
			   	password: '123',
			    address: '557 Seymour Street, Vancouver, V5R K8L' },
			Min:{
			   	password: '123',
			    address: '558 Seymour Street, Vancouver, V5R B8F' },
			Ryan:{
			   	password: '123',
			    address: '559 Seymour Street, Vancouver, V5R D8B' },
			Theo:{
			   	password: '123',
			    address: '560 Seymour Street, Vancouver, V5R C8A' } })
				})
})
