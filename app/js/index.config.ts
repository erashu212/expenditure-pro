module ExpenseManager{
	export class Config{
		static $inject = ['$stateProvider', '$urlRouterProvider'];
		constructor($stateProvider: ng.ui.IStateProvider, $urlRouteProvider: ng.ui.IUrlRouterProvider){
			$stateProvider.
			state('Home', {
				url: '/dashboard',
				views: {
					'Header': {
						templateUrl: '../components/templates/layout/header.tpl.html'
					},
					'Content':{
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
	}
}