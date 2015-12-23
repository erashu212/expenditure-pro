module ExpenseManager.Directive {
	'use strict'

	export class ExpenseModal implements angular.IDirective {
		public restrict: string = 'E';
		public bindToController: boolean = true;
		public scope = {
			'onSave': '&',
			'templateUrl' : '@',
			'buttonText': '@',
			'buttonClass': '@'
		};
		public controllerAs = 'modal';
		public controller = ExpenseManager.Directive.ModalController;
		public template: string = '<div class="row"><div class= "col-md-12">'
		+ '<button class="btn {{modal.buttonClass}}" ng-click="modal.openModal()"><i class="fa fa-plus"></i>&nbsp;{{modal.buttonText}}</button>'
		+ '</div></div>';
		constructor() {
		}
		public link: (scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) => void;

		//Initiation starts here
		public static Factory() {
			var expenseModalObj = () => {
				return new ExpenseModal();
			}

			return expenseModalObj;
		}
	}

	export class ModalController{
		static $inject = ['ModalSvc'];
		private modal;
		constructor(private modalSvc: ExpenseManager.Service.ModalService) {
			this.modal = this;
		}

		public openModal = () =>{
			this.modalSvc.open(this.modal.templateUrl, this.modal.onSave);
		}
	}
}