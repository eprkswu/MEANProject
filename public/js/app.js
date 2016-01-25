/**
 * http://usejsdoc.org/
 */
var boardApp = angular.module('boardApp', ['ngRoute']);

boardApp.config(function($routeProvider, $locationProvider){
	$routeProvider.
		when('/', {
			templateUrl:'/template/list',
			controller:'BoardListCtrl'
		}).
		when('/write', {
			templateUrl:'/template/write',
			controller:'BoardWriteCtrl'
		}).
		otherwise({
			redirectTo:'/'
		});
	
	$locationProvider.html5Mode(true);
});