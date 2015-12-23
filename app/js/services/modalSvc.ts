module ExpenseManager.Service{
	export class ModalService {
		static $inject = ['$uibModal', 'CategorySvc'];
		constructor(private $modal: ng.ui.bootstrap.IModalService) {
		}

		open = (templateUrl, onSave, formData = {}) => {
			var options: ng.ui.bootstrap.IModalSettings = {
				templateUrl: templateUrl,
				controller: ['$uibModalInstance', 'data', 'CategorySvc', function($uibModalInstance, formData, categorySvc) {
					var modal = this;
					modal.ExpenseData = formData;
					modal.Categories = categorySvc.getAll();

					modal.onSubmit = () => {
						$uibModalInstance.close(this.ExpenseData);
					}

					modal.onClose = () => {
						$uibModalInstance.dismiss('cancel');
					}
				}],
				controllerAs: 'modal',
				resolve: {
					data: formData
				}
			};

			this.$modal.open(options).result.then((data) => {
				onSave({ data: data });
			});
		}
	}
}