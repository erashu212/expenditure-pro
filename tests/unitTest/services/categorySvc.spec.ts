describe('CategorySvc', () => {

	var _categorySvc,
		_storageSvc;
	beforeEach(() => {
		angular.mock.module('ExpenseManager');
	});

	beforeEach(inject((CategorySvc, StorageSvc) => {
		_storageSvc = StorageSvc;
		_categorySvc = CategorySvc;
	}));

	it('should be available and should have been injected by our ExpenseManager app', () => {
		expect(_categorySvc).to.exist;
	})

	it('get all categories: should be having empty array.', () => {
		_storageSvc.removeAll();
		expect(_categorySvc.getAll()).to.have.length(0);
	})

	it('adding category for first time', () => {
		let isSet = _categorySvc.add('Rent');
		expect(isSet).to.be.true;
	})

	it('Add Category: if category is unique', () => {
		let isUnique = _categorySvc.isUnique('Rent');
		if(isUnique){
			var isAdded = _categorySvc.add('Rent');
		}
		expect(isUnique).to.not.be.true;
		expect(isAdded).to.not.be.true;
	})

	it('Get All Category', () => {
		let categories = _categorySvc.getAll();
		expect(categories).to.have.length.above(0);
		expect(categories).to.have.length.within(0,1);
	})
});