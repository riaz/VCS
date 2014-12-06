angular.module('vcs').controller('HomeCtrl',function($scope){
    $scope.init = function(){
        $('#sr-5').dragdrop({ makeClone: true ,dragClass:'scenario-block-drag'});
    }
});