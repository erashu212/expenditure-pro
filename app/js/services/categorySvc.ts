module ExpenseManager.Service{
	export class CategorySvc{
		static $inject = ['StorageSvc'];
		constructor(private storageSvc: ExpenseManager.Service.LocalStorage) {
		}

		getAll(): Array<Models.ICategory> {
			return this.storageSvc.get('category') || [];
		}

		isUnique(title: string): boolean{
			let categories = this.storageSvc.get('category') || [];
			var res = categories.filter(function(item){
				return item.Title.toLowerCase() == title.toLowerCase();
			})
			return res.length == 0;
		}

		add(title: string): boolean {
			var category: Models.ICategory = {
				Id: new Date().valueOf(),
				Title: title
			};
			let categories: Models.ICategory[] = this.storageSvc.get('category') || [];
			categories.push(category);
			this.storageSvc.set('category', categories);
			return true;
		}

		update(category: Models.ICategory): boolean {
			let categories: Array<Models.ICategory> = this.storageSvc.get('category') || [];
			categories.forEach((item, idx) => {
				if (item.Id == category.Id) {
					categories[idx] = item;
				}
			});
			this.storageSvc.set('category', categories);
			return true;
		}

		delete(category: Models.ICategory): boolean {
			let categories: Array<Models.ICategory> = this.storageSvc.get('category') || [];
			categories.forEach((item, idx) => {
				if (item.Id == category.Id) {
					categories.splice(idx, 1);
				}
			});
			this.storageSvc.set('category', categories); 
			return true;
		}
	}
}