boardApp.controller('BoardWriteCtrl', function($scope, $http, $location){
	$scope.$parent.buttonName = '저장';
	$scope.$parent.isWrite = true;

	$scope.$parent.clickButton = function($event){
		$event.preventDefault();
		
		var formData = {
			title:$scope.title,
			content:$scope.content
		}
		
		$http({
			method:'POST',
			url:'/test',
			data:formData
		}).success(function(data){
			if(data.code == 200){
				if(typeof(Storage) != 'undefined'){
					var tempContent = window.localStorage.getItem('tempContent');
					if(tempContent != null){
						window.localStorage.removeItem('tempContent');
					}
				}
				$location.path('/').replace();
			}else{
				alert('저장에 실패 하였습니다.');
			}
		});
	};
	
	$scope.$parent.list = function($event){
		$event.preventDefault();
		
		$location.path('/').replace();
	};
	
	$scope.contentKeyup = function(){
		if(worker != null){
			setTimeout(function(){
				worker.postMessage($('#content').val());
			},100);
		}
		
		if(window.navigator.userAgent.toLowerCase().indexOf('Firefox') <= 0){
			checkByte($('#content').val(), 200);
		}
	};
	
	var ff_textarea_val = '';
	var ff_textarea_timeout = null;
	$scope.contentKeyDown = function(){
		if(window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
			if(null != ff_textarea_timeout){
				clearTimeout(ff_textarea_timeout);
			}
			
			if($('#content').val() != ff_textarea_val){
				ff_textarea_val = $('#content').val();
				
				checkByte($('#content').val(), 200);
			}
			
			ff_textarea_timeout = window.setTimeout(function(){
				$scope.contentKeyDown();
			}, 300);
		}
	};
	
	$scope.uploadFile = function($event){
		$event.preventDefault();
		
		var frm = document.frmUploadFile;
		frm.target = 'ifrmUploadFile';
		frm.submit();
	};

	var init = function(){
		if(typeof(Storage) != 'undefined'){
			var tempContent = window.localStorage.getItem('tempContent');
			if(tempContent != null && $.trim(tempContent) != ''){
				if(confirm('작성중인 내용이 있습니다.\n이어서 작성 하시겠습니까?')){
					$scope.content = tempContent;
					checkByte(tempContent, 200);
				}
				
				//window.localStorage.removeItem('tempContent');
			}
		}
		
		callWorker();
	};
	
	var worker = null;
	
	var callWorker = function(){
		if(!!window.Worker){
			if(worker != null) worker.terminate();
			
			worker = new Worker('/static/js/boardWorker.js');
			
			worker.onmessage = function(event){
				window.localStorage.setItem('tempContent', event.data);
			}
		}
	};
	
	var checkByte = function(value, maxByte){
		var str = value;
		var str_len = str.length;
		var return_byte = 0;
		var return_length = 0;
		var return_str = "";
		var one_char = "";
		
		for(var i = 0; i < str_len; i++){
			one_char = str.charAt(i);
			
			if(escape(one_char).length > 4){
				return_byte += 2;
			}else{
				return_byte += 1;
			}
			
			if(return_byte <= maxByte){
				return_length = i + 1;
			}
		}
		
		if(return_byte > maxByte){
			return_str = str.substr(0, return_length);
			$scope.content = return_str;
		}else{
			$('.byte_count').text(return_byte);
		}
	};
	
	init();
});
