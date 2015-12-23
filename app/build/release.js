var ExpenseManager;
(function (ExpenseManager) {
    var Config = (function () {
        function Config($stateProvider, $urlRouteProvider) {
            $stateProvider.
                state('Home', {
                url: '/dashboard',
                views: {
                    'Header': {
                        templateUrl: '../components/templates/layout/header.tpl.html'
                    },
                    'Content': {
                        templateUrl: '../components/templates/dashboard.tpl.html',
                        controller: 'DashboardCtrl',
                        controllerAs: 'vm'
                    }
                }
            }).
                state('Category', {
                url: '/category',
                views: {
                    'Header': {
                        templateUrl: '../components/templates/layout/header.tpl.html'
                    },
                    'Content': {
                        templateUrl: '../components/templates/category.tpl.html',
                        controller: 'CategoryCtrl',
                        controllerAs: 'vm'
                    }
                }
            }).
                state('Login', {
                url: '/login',
                views: {
                    'Content': {
                        templateUrl: '../components/templates/login.tpl.html',
                        controller: 'CategoryCtrl',
                        controllerAs: 'vm'
                    }
                }
            });
            $urlRouteProvider.otherwise('/login');
        }
        Config.$inject = ['$stateProvider', '$urlRouterProvider'];
        return Config;
    })();
    ExpenseManager.Config = Config;
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Service;
    (function (Service) {
        var LocalStorage = (function () {
            function LocalStorage() {
                this.$$window = window;
                this.isLocalStorage = typeof this.$$window.localStorage != 'undefined';
            }
            LocalStorage.prototype.set = function (key, value) {
                this.$$window.localStorage.setItem(key, JSON.stringify(value));
                return true;
            };
            LocalStorage.prototype.get = function (key) {
                var data = this.$$window.localStorage.getItem(key);
                if (!data) {
                    return false;
                }
                return JSON.parse(data);
            };
            LocalStorage.prototype.remove = function (key) {
                this.$$window.localStorage.removeItem(key);
                return true;
            };
            return LocalStorage;
        })();
        Service.LocalStorage = LocalStorage;
    })(Service = ExpenseManager.Service || (ExpenseManager.Service = {}));
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Filter;
    (function (Filter) {
        var CommonFilter = (function () {
            function CommonFilter() {
            }
            CommonFilter.Concat = function () {
                return function (value) {
                    var concatenatedArr = [];
                    if (value) {
                        for (var x in value)
                            if (value.hasOwnProperty(x))
                                concatenatedArr.push(value[x].Title);
                    }
                    return concatenatedArr.join(',');
                };
            };
            return CommonFilter;
        })();
        Filter.CommonFilter = CommonFilter;
    })(Filter = ExpenseManager.Filter || (ExpenseManager.Filter = {}));
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Service;
    (function (Service) {
        var ModalService = (function () {
            function ModalService($modal) {
                var _this = this;
                this.$modal = $modal;
                this.open = function (templateUrl, onSave, formData) {
                    if (formData === void 0) { formData = {}; }
                    var options = {
                        templateUrl: templateUrl,
                        controller: ['$uibModalInstance', 'data', 'CategorySvc', function ($uibModalInstance, formData, categorySvc) {
                                var _this = this;
                                var modal = this;
                                modal.ExpenseData = formData;
                                modal.Categories = categorySvc.getAll();
                                modal.onSubmit = function () {
                                    $uibModalInstance.close(_this.ExpenseData);
                                };
                                modal.onClose = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            }],
                        controllerAs: 'modal',
                        resolve: {
                            data: formData
                        }
                    };
                    _this.$modal.open(options).result.then(function (data) {
                        onSave({ data: data });
                    });
                };
            }
            ModalService.$inject = ['$uibModal', 'CategorySvc'];
            return ModalService;
        })();
        Service.ModalService = ModalService;
    })(Service = ExpenseManager.Service || (ExpenseManager.Service = {}));
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Service;
    (function (Service) {
        var CategorySvc = (function () {
            function CategorySvc(storageSvc) {
                this.storageSvc = storageSvc;
            }
            CategorySvc.prototype.getAll = function () {
                return this.storageSvc.get('category') || [];
            };
            CategorySvc.prototype.isUnique = function (title) {
                var categories = this.storageSvc.get('category') || [];
                var res = categories.filter(function (item) {
                    return item.Title.toLowerCase() == title.toLowerCase();
                });
                return res.length == 0;
            };
            CategorySvc.prototype.add = function (title) {
                var category = {
                    Id: new Date().valueOf(),
                    Title: title
                };
                var categories = this.storageSvc.get('category') || [];
                categories.push(category);
                this.storageSvc.set('category', categories);
                return true;
            };
            CategorySvc.prototype.update = function (category) {
                var categories = this.storageSvc.get('category') || [];
                categories.forEach(function (item, idx) {
                    if (item.Id == category.Id) {
                        categories[idx] = item;
                    }
                });
                this.storageSvc.set('category', categories);
                return true;
            };
            CategorySvc.prototype.delete = function (category) {
                var categories = this.storageSvc.get('category') || [];
                categories.forEach(function (item, idx) {
                    if (item.Id == category.Id) {
                        categories.splice(idx, 1);
                    }
                });
                this.storageSvc.set('category', categories);
                return true;
            };
            CategorySvc.$inject = ['StorageSvc'];
            return CategorySvc;
        })();
        Service.CategorySvc = CategorySvc;
    })(Service = ExpenseManager.Service || (ExpenseManager.Service = {}));
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Service;
    (function (Service) {
        var ExpenseSvc = (function () {
            function ExpenseSvc(storageSvc) {
                this.storageSvc = storageSvc;
            }
            ExpenseSvc.prototype.getAll = function () {
                return this.storageSvc.get('expense') || [];
            };
            ExpenseSvc.prototype.add = function (expenseData) {
                var expenses = this.storageSvc.get('expense') || [];
                expenses.push(expenseData);
                return this.storageSvc.set('expense', expenses);
            };
            ExpenseSvc.prototype.delete = function (expense) {
                var expenses = this.storageSvc.get('expense') || [];
                expenses.forEach(function (item, idx) {
                    if (item.Id == expense.Id) {
                        expenses.splice(idx, 1);
                    }
                });
                this.storageSvc.set('expense', expenses);
                return true;
            };
            ExpenseSvc.$inject = ['StorageSvc'];
            return ExpenseSvc;
        })();
        Service.ExpenseSvc = ExpenseSvc;
    })(Service = ExpenseManager.Service || (ExpenseManager.Service = {}));
})(ExpenseManager || (ExpenseManager = {}));



var ExpenseManager;
(function (ExpenseManager) {
    var Controller;
    (function (Controller) {
        var CategoryCtrl = (function () {
            function CategoryCtrl(categorySvc, modalSvc) {
                this.categorySvc = categorySvc;
                this.modalSvc = modalSvc;
                this.Categories = [];
                this.Categories = categorySvc.getAll();
            }
            CategoryCtrl.prototype.onSave = function (data) {
                if (this.categorySvc.isUnique(data.Title) && this.categorySvc.add(data.Title)) {
                    this.Categories = this.categorySvc.getAll();
                }
            };
            CategoryCtrl.prototype.onUpdate = function (data) {
                if (this.categorySvc.isUnique(data.Title) && this.categorySvc.update(data)) {
                    this.Categories = this.categorySvc.getAll();
                }
            };
            CategoryCtrl.prototype.onEdit = function (categoryData) {
                this.modalSvc.open('directive-templates/category-modal.html', this.onUpdate, { Id: categoryData.Id, Title: categoryData.Title });
            };
            CategoryCtrl.prototype.onDelete = function (data) {
                if (confirm('Do you want to remove this entry?')) {
                    this.categorySvc.delete(data);
                    this.Categories = this.categorySvc.getAll();
                }
            };
            CategoryCtrl.$inject = ['CategorySvc', 'ModalSvc'];
            return CategoryCtrl;
        })();
        Controller.CategoryCtrl = CategoryCtrl;
    })(Controller = ExpenseManager.Controller || (ExpenseManager.Controller = {}));
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Controller;
    (function (Controller) {
        var DashboardCtrl = (function () {
            function DashboardCtrl(expenseSvc) {
                this.expenseSvc = expenseSvc;
                this.options = {
                    chart: {
                        type: 'pieChart',
                        height: 450,
                        donut: true,
                        x: function (d) { return d.Title; },
                        y: function (d) { return d.Amount; },
                        showLabels: true,
                        pie: {
                            startAngle: function (d) { return d.startAngle / 2 - Math.PI / 2; },
                            endAngle: function (d) { return d.endAngle / 2 - Math.PI / 2; }
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
                this.Expenses = this.expenseSvc.getAll();
            }
            DashboardCtrl.prototype.onSaveExpense = function (expense) {
                var expenseData = {
                    Id: new Date().valueOf(),
                    Title: expense.Description,
                    Amount: expense.Amount,
                    CreateDate: new Date().toString(),
                    Categories: [expense.Category]
                };
                if (this.expenseSvc.add(expenseData)) {
                    this.Expenses = this.expenseSvc.getAll();
                }
            };
            DashboardCtrl.prototype.onDelete = function (data) {
                if (confirm('Do you want to remove this entry?')) {
                    this.expenseSvc.delete(data);
                    this.Expenses = this.expenseSvc.getAll();
                }
            };
            DashboardCtrl.$inject = ['ExpenseSvc'];
            return DashboardCtrl;
        })();
        Controller.DashboardCtrl = DashboardCtrl;
    })(Controller = ExpenseManager.Controller || (ExpenseManager.Controller = {}));
})(ExpenseManager || (ExpenseManager = {}));

var ExpenseManager;
(function (ExpenseManager) {
    var Directive;
    (function (Directive) {
        'use strict';
        var ExpenseModal = (function () {
            function ExpenseModal() {
                this.restrict = 'E';
                this.bindToController = true;
                this.scope = {
                    'onSave': '&',
                    'templateUrl': '@',
                    'buttonText': '@',
                    'buttonClass': '@'
                };
                this.controllerAs = 'modal';
                this.controller = ExpenseManager.Directive.ModalController;
                this.template = '<div class="row"><div class= "col-md-12">'
                    + '<button class="btn {{modal.buttonClass}}" ng-click="modal.openModal()"><i class="fa fa-plus"></i>&nbsp;{{modal.buttonText}}</button>'
                    + '</div></div>';
            }
            //Initiation starts here
            ExpenseModal.Factory = function () {
                var expenseModalObj = function () {
                    return new ExpenseModal();
                };
                return expenseModalObj;
            };
            return ExpenseModal;
        })();
        Directive.ExpenseModal = ExpenseModal;
        var ModalController = (function () {
            function ModalController(modalSvc) {
                var _this = this;
                this.modalSvc = modalSvc;
                this.openModal = function () {
                    _this.modalSvc.open(_this.modal.templateUrl, _this.modal.onSave);
                };
                this.modal = this;
            }
            ModalController.$inject = ['ModalSvc'];
            return ModalController;
        })();
        Directive.ModalController = ModalController;
    })(Directive = ExpenseManager.Directive || (ExpenseManager.Directive = {}));
})(ExpenseManager || (ExpenseManager = {}));

/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="services/storage.ts" />
/// <reference path="filters/common.ts" />
/// <reference path="services/modalSvc.ts" />
/// <reference path="services/categorySvc.ts" />
/// <reference path="services/expenseSvc.ts" />
/// <reference path="models/category.model.ts" />
/// <reference path="controllers/category.ts" />
/// <reference path="controllers/dashboard.ts" />
/// <reference path="directives/expense.modal.ts" /> 

/// <reference path="_reference.ts" />
var Service = ExpenseManager.Service;
var Controller = ExpenseManager.Controller;
var Filter = ExpenseManager.Filter;
var Directive = ExpenseManager.Directive;
var ExpenseManager;
(function (ExpenseManager) {
    var app = angular.module('ExpenseManager', ['ui.bootstrap', 'ui.router', 'nvd3']);
    app.config(ExpenseManager.Config);
    angular.module('ExpenseManager')
        .controller('DashboardCtrl', ExpenseManager.Controller.DashboardCtrl)
        .controller('CategoryCtrl', ExpenseManager.Controller.CategoryCtrl)
        .directive('expenseModal', ExpenseManager.Directive.ExpenseModal.Factory())
        .service('StorageSvc', ExpenseManager.Service.LocalStorage)
        .service('CategorySvc', ExpenseManager.Service.CategorySvc)
        .service('ExpenseSvc', ExpenseManager.Service.ExpenseSvc)
        .service('ModalSvc', ExpenseManager.Service.ModalService)
        .filter('concat', [ExpenseManager.Filter.CommonFilter.Concat]);
})(ExpenseManager || (ExpenseManager = {}));


