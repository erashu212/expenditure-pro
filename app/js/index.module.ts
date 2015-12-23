/// <reference path="_reference.ts" />

import Models = ExpenseManager.Models;
import Service = ExpenseManager.Service;
import Controller = ExpenseManager.Controller;
import Filter = ExpenseManager.Filter;
import Directive = ExpenseManager.Directive;

module ExpenseManager {
	var app = angular.module('ExpenseManager', ['ui.bootstrap', 'ui.router', 'nvd3']);
	app.config(Config);
	angular.module('ExpenseManager')
	.controller('DashboardCtrl', ExpenseManager.Controller.DashboardCtrl)
	.controller('CategoryCtrl', ExpenseManager.Controller.CategoryCtrl)
	.directive('expenseModal', ExpenseManager.Directive.ExpenseModal.Factory())
	.service('StorageSvc', ExpenseManager.Service.LocalStorage)
	.service('CategorySvc', ExpenseManager.Service.CategorySvc)
	.service('ExpenseSvc', ExpenseManager.Service.ExpenseSvc)
	.service('ModalSvc', ExpenseManager.Service.ModalService)
	.filter('concat', [ExpenseManager.Filter.CommonFilter.Concat]);
}