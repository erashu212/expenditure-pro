/// <reference path="../_reference.spec.ts" />
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;

describe('LocalStorage', () => {
	beforeEach(() => {
		angular.mock.module('ExpenseManager');
	});

	var service;

	beforeEach(inject((StorageSvc) => {
		service = StorageSvc;
	}));

	it('should exist', () => {
		expect(service).to.exist;
	});

	it('should set the value in storage and should return boolean value', () => {
		let isSet: boolean = service.set('expense1', 'test local storage');
		expect(isSet).to.not.be.undefined;
		expect(isSet).to.be.true;
	});

	it('should return false if key is not valid', () => {
		let isExist: boolean = service.get('expense12');
		expect(isExist).to.not.be.true;
	});

	it('should return object if key is valid', () => {
		let isExist: boolean = service.get('expense1');
		expect(isExist).to.be.deep.equal('test local storage');
	});

	it('should be able to wipe out the stored data for valid and key and should return boolean value', () => {
		let isExist: boolean = service.remove('expense1');
		expect(isExist).to.be.true;
	});

});