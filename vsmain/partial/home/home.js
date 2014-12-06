angular.module('vcs').controller('HomeCtrl',function($scope){
    $scope.init = function(){
        $('.scenario-block').draggable({
            helper: 'clone',
            zIndex: 100,
            start: function( event, ui ) {
                $('.ui-draggable-dragging .scenario-details').addClass('ui-drag');
            },
            stop: function( event, ui ) {
      
            }
        });

        $('#map-container').droppable({
            accept: '.scenario-block',
            hoverClass: 'map-container-drop',
            activeClass: 'map-container-droppable',
            activate: function( event, ui ) {
                $('#map-container').parent('.panel').css('border','0');
            },
            deactivate: function( event, ui ) {
                $('#map-container').parent('.panel').css('border','2px solid #ecf0f1');
            }
        });
    }
});