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

	it('get all categories: should be having length greater than zero.', () => {
	})
});