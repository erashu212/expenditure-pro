module ExpenseManager.Service {
	export class ExpenseSvc {
		static $inject = ['StorageSvc'];
		
		constructor(private storageSvc: ExpenseManager.Service.LocalStorage) {
		}

		getAll(): Array<ExpenseManager.Models.IExpense> {
			return this.storageSvc.get('expense') || [];
		}

		add(expenseData : ExpenseManager.Models.IExpense): boolean {
			let expenses : Array<Models.IExpense> = this.storageSvc.get('expense') || [];
			expenses.push(expenseData);
			return this.storageSvc.set('expense', expenses);
		}

		delete(expense: Models.IExpense): boolean {
			let expenses: Array<Models.IExpense> = this.storageSvc.get('expense') || [];
			expenses.forEach((item, idx) => {
				if (item.Id == expense.Id) {
					expenses.splice(idx, 1);
				}
			});
			this.storageSvc.set('expense', expenses);
			return true;
		}
	}
}