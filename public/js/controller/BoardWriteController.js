boardApp.controller('BoardWriteCtrl', function($scope, $http, $routeParams, $location){
	$scope.$parent.buttonName = '저장';
	$scope.$parent.isWrite = true;

	$scope.$parent.clickButton = function($event){
		$event.preventDefault();
		
		var files = [];
		
		$('.image_disp_layer').each(function(i){
			var _this = $(this);			
			var file_data = {};
			
			if(_this.css('display') == 'block'){
				file_data = {
					original_url:_this.attr('original_image'),
					thumbnail_url_130:_this.attr('thumbnail_image_130'),
					thumbnail_url_200:_this.attr('thumbnail_image_200'),
					thumbnail_url_300:_this.attr('thumbnail_image_300')
				}
				
				files.push(file_data);
			}
		});
		
		var formData = {
			title:$scope.title,
			content:$scope.content,
			name:$scope.name,
			files:files
		}
		
		var method = '';
		if(typeof($routeParams.seq) != "undefined"){
			method = 'PUT';			
			formData.seq = $routeParams.seq;
		}else{
			method = 'POST';			
		}
		
		$http({
			method:method,
			url:'/put/board',
			data:formData
		}).success(function(data){
			if(data.code == 200){
				if(typeof(Storage) != 'undefined'){
					var tempContent = window.localStorage.getItem('tempContent');
					if(tempContent != null){
						window.localStorage.removeItem('tempContent');
					}
				}
				alert('저장이 완료 되었습니다.');
				$location.path('/').replace();
			}else{
				alert('저장에 실패 하였습니다.\n'+data.message);
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
		if(typeof($routeParams.seq) != "undefined"){
			$http({
				method:'GET',
				url:'/board_detail.json',
				params:{seq:$routeParams.seq}
			}).success(function(data){
				if(data.length > 0){
					var detail_content = data[0];
					
					$scope.title = detail_content.title;
					$scope.content = detail_content.content;
					$scope.name = detail_content.name;
					
					var files = detail_content.files;
					
					$.each(files, function(i){
						var file_data = files[i];
						
						$("input[type='file']:eq("+i+")").hide();
		  				
		  				$(".image_disp_layer:eq("+i+")").html("<img src=\""+file_data.thumbnail_url_130+"\" style=\"width:130;height:130\" />");
		  				$(".image_disp_layer:eq("+i+")").attr("original_image",file_data.original_url);
		  				$(".image_disp_layer:eq("+i+")").attr("thumbnail_image_130",file_data.thumbnail_url_130);
		  				$(".image_disp_layer:eq("+i+")").attr("thumbnail_image_200",file_data.thumbnail_url_200);
		  				$(".image_disp_layer:eq("+i+")").attr("thumbnail_image_300",file_data.thumbnail_url_300);
		  				$(".image_disp_layer:eq("+i+")").show();
					});
					
					$("input[type='file']").each(function(i){
			  			if($(this).css("display") == "none"){
			  				$(this).remove();
			  			}
			  		});
				}
			});
		}else{
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
