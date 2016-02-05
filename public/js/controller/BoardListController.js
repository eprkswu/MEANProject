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
	
	var get_board_list = function(seq){
		$http({
			method:'GET',
			url:'/board_list.json',
			params:{seq:0}
		}).success(function(data){
			$scope.board_list = data.persons;
			
			var template = '<div ng-repeat="board in board_list">'; 
			template += '<div class="card-header" role="tab" id="heading_{{$index}}">';
			template += '<div class="pull-right"><a href="#" class="label label-info label-fill" ng-click="detail($event, board.seq)">Update</a>';
			template += '<a ng-click="toggleModal()" class="label label-danger label-fill">Delete</a>';
			template += '</div>';
			template += '<a data-toggle="collapse" data-parent="#accordion" href="#collapse_{{$index}}" aria-expanded="false" aria-controls="collapse_{{$index}}" onclick="return false;">';
			template += '{{board.title}}';
			template += '</a>';
			template += '</div>';
			template += '<div id="collapse_{{$index}}" class="card-block collapse" role="tabpanel" aria-labelledby="heading_{{$index}}">';
			template += '<p ng-bind-html="board.content | nl2br"></p>';
			template += '<p>';
			template += '<img ng-src="{{file.thumbnail_url_130}}" ng-repeat="file in board.files" ng-show="board.files.length > 0" />';
			template += '</p>';
			template += '</div>';
			template += '</div>';
			$('#card_wrap').append($compile(template)($scope));
		});
	};
	
	var init = function(){
		get_board_list(0);
	};
	
	init();
});