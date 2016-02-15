boardApp.controller('BoardListCtrl', function($scope, $http, $location, $compile){
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
	
	$scope.detail = function($event, seq){
		$event.preventDefault();
		$location.path('/detail/'+seq).replace();
	};

	$scope.board_list = [];
	
	$scope.readMore = function($event){
		$event.preventDefault();
		
		//var seq = $("#card_wrap .card-header:last").attr('board-seq');
		var seq = $("#card_wrap .card-header").length;
		
		get_board_list(seq);
	};
	
	var get_board_list = function(seq){
		$http({
			method:'GET',
			url:'/board_list.json',
			params:{start:seq}
		}).success(function(data){
			$scope.board_list = $scope.board_list.concat(data.persons);
			if(data.total_list > 5 && data.persons.length > 0){
				$('#btnReadMore').show();
			}else {
				$('#btnReadMore').hide();
			}
		});
	};
	
	var init = function(){
		get_board_list(0);
	};
	
	init();
});