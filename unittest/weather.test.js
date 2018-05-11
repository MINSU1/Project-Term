const assert = require('chai').assert;
// const sayHello = require('../index').sayHello;
// const addNumbers = require('../index').addNumbers;
const app = require('../unittest');

sayHelloResult=app.sayHello();
addNumbersResult=app.addNumbers(5,5);

describe('App',function(){
	describe('sayHellofunctions', function(){
		it('sayHello should return hello',function(){
		// let result =  app.sayHello();
		assert.equal(sayHelloResult,'hello');
		});

		it('sayHello should return type string',function(){
			// let result =  app.sayHello();
			assert.typeOf(sayHelloResult,'string');
		});
	});
	
	describe('addNumbersfunctions', function(){
		it('addNumbers should be above 5',function(){
		// let result =  app.addNumbers(5,5);
		assert.isAbove(addNumbersResult,5);
		});

		it('addNumbers should return type numbers',function(){
			// let result =  app.addNumbers(5,5);
			assert.typeOf(addNumbersResult,'number');
		});
	});
});