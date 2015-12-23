module ExpenseManager.Controller{

	export class DashboardCtrl {
		static $inject = ['ExpenseSvc'];
		public Expenses : Array<ExpenseManager.Models.IExpense>;

		public options = {
            chart: {
                type: 'pieChart',
                height: 450,
                donut : true,
                x: function(d) { return d.Title; },
                y: function(d) { return d.Amount; },
                showLabels: true,

                pie: {
                    startAngle: function(d) { return d.startAngle / 2 - Math.PI / 2 },
                    endAngle: function(d) { return d.endAngle / 2 - Math.PI / 2 }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 140,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
        
		constructor(private expenseSvc : ExpenseManager.Service.ExpenseSvc) {
			this.Expenses = this.expenseSvc.getAll();
		}

		public onSaveExpense (expense){
			let expenseData = {
				Id: new Date().valueOf(),
				Title: expense.Description,
				Amount: expense.Amount,
				CreateDate: new Date().toString(),
				Categories: [expense.Category]
			}
			if (this.expenseSvc.add(expenseData)) {
				this.Expenses = this.expenseSvc.getAll();
			}
		}

		onDelete(data: Models.IExpense): void {
			if (confirm('Do you want to remove this entry?')) {
				this.expenseSvc.delete(data);
				this.Expenses = this.expenseSvc.getAll();
			}
		}
	}
}