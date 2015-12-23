module ExpenseManager.Controller{

	export class CategoryCtrl{
		static $inject = ['CategorySvc', 'ModalSvc'];
		public Categories: Array<Models.ICategory> = [];
		constructor(private categorySvc: ExpenseManager.Service.CategorySvc,
			private modalSvc: ExpenseManager.Service.ModalService) {
			this.Categories = categorySvc.getAll();
		}

		onSave(data):void {
			if (this.categorySvc.isUnique(data.Title) && this.categorySvc.add(data.Title)) {
				this.Categories = this.categorySvc.getAll();
			}
		}

		onUpdate(data):void{
			if (this.categorySvc.isUnique(data.Title) && this.categorySvc.update(data)) {
				this.Categories = this.categorySvc.getAll();
			}
		}

		onEdit(categoryData):void {
			this.modalSvc.open('directive-templates/category-modal.html', this.onUpdate, {Id: categoryData.Id, Title: categoryData.Title});
		}

		onDelete(data: Models.ICategory):void {
			if(confirm('Do you want to remove this entry?')){
				this.categorySvc.delete(data);
				this.Categories = this.categorySvc.getAll();
			}
		}
	}
}