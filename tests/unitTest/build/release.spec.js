/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-mocks.d.ts" />
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
var sinon = sinon;

describe('CategorySvc', function () {
    var _categorySvc, _storageSvc;
    beforeEach(function () {
        angular.mock.module('ExpenseManager');
    });
    beforeEach(inject(function (CategorySvc, StorageSvc) {
        _storageSvc = StorageSvc;
        _categorySvc = CategorySvc;
    }));
    it('should be available and should have been injected by our ExpenseManager app', function () {
        expect(_categorySvc).to.exist;
    });
    it('get all categories: should be having empty array.', function () {
        _storageSvc.removeAll();
        expect(_categorySvc.getAll()).to.have.length(0);
    });
    it('adding category for first time', function () {
        var isSet = _categorySvc.add('Rent');
        expect(isSet).to.be.true;
    });
    it('Add Category: if category is unique', function () {
        var isUnique = _categorySvc.isUnique('Rent');
        if (isUnique) {
            var isAdded = _categorySvc.add('Rent');
        }
        expect(isUnique).to.not.be.true;
        expect(isAdded).to.not.be.true;
    });
    it('Get All Category', function () {
        var categories = _categorySvc.getAll();
        expect(categories).to.have.length.above(0);
        expect(categories).to.have.length.within(0, 1);
    });
});

/// <reference path="../_reference.spec.ts" />
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should;
describe('LocalStorage', function () {
    beforeEach(function () {
        angular.mock.module('ExpenseManager');
    });
    var service;
    beforeEach(inject(function (StorageSvc) {
        service = StorageSvc;
    }));
    it('should exist', function () {
        expect(service).to.exist;
    });
    it('should set the value in storage and should return boolean value', function () {
        var isSet = service.set('expense1', 'test local storage');
        expect(isSet).to.not.be.undefined;
        expect(isSet).to.be.true;
    });
    it('should return false if key is not valid', function () {
        var isExist = service.get('expense12');
        expect(isExist).to.not.be.true;
    });
    it('should return object if key is valid', function () {
        var isExist = service.get('expense1');
        expect(isExist).to.be.deep.equal('test local storage');
    });
    it('should be able to wipe out the stored data for valid and key and should return boolean value', function () {
        var isExist = service.remove('expense1');
        expect(isExist).to.be.true;
    });
});
