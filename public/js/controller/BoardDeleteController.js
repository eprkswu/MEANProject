/**
 * Created by MOTIF on 2016. 1. 27..
 */
boardApp.controller('BoardDeleteCtrl', function($scope){
    console.log("delete called?");
    //alert('Are you sure?');

    $scope.modalShown = false;
    $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
    };

    // delete api
    /*
    $scope.$parent.clickButton = function($event) {
        var formData = {
            id: $scope.id
        }

        $http({
            method: 'DELETE',
            url: '/test',
            data: formData
        }).success(function (data) {
            if (data.code == 200) {
                if (typeof(Storage) != 'undefined') {
                    var tempContent = window.localStorage.getItem('tempContent');
                    if (tempContent != null) {
                        window.localStorage.removeItem('tempContent');
                    }
                }
                $location.path('/').replace();
            } else {
                alert('삭제에 실패 하였습니다.');
            }
        });
    };
    */
});