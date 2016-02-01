boardApp.controller('BoardListCtrl', function($scope, $location){
	$scope.$parent.buttonName = '글쓰기';
	$scope.$parent.isWrite = false;
	
	$scope.$parent.clickButton = function($event){
		$event.preventDefault();
		$location.path('/write').replace();
	};

	$scope.modalShown = false;
	$scope.toggleModal = function() {
		$scope.modalShown = !$scope.modalShown;
	};
});