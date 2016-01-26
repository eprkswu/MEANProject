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
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
}).directive('krTextarea', function($parse){
	return {
		priority:2,
		restrict:'A',
		compile:function(element){
			element.on('compositionstart',function(e){
				e.stopImmediatePropagation();
			});
		}
	}
});