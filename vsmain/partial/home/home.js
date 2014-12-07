angular.module('vcs').controller('HomeCtrl',function($scope, mapconfig, $firebase,$timeout){
    
    $scope.init = function(){
        $scope.addMap();
        $('[data-toggle="tooltip"]').tooltip();
        $scope.getScenarios();
    },
    
    $scope.getScenarios = function(){
        var ref = new Firebase("https://vcstest.firebaseio.com/scenarios");
        $scope.sync = $firebase(ref);
        
        $scope.scenarios = $scope.sync.$asObject();
        
        $scope.scenarios.$loaded().then(function() {
            $timeout(function(){
                $scope.drag_drop_init();
            },1000);
        });
    }
    
    $scope.addMap = function(){
        $scope.google_map= new google.maps.Map(document.getElementById('map-holder'),
                    mapconfig.mapOptions);
                    // console.log(mapconfig.mapOptions);
    },
    
    $scope.drag_drop_init = function(){
        $('.scenario-block').draggable({
            helper: 'clone',
            zIndex: 100,
            start: function( event, ui ) {
                $('.ui-draggable-dragging .scenario-details').addClass('ui-drag');
            },
            stop: function( event, ui ) {
      
            }
        });

        $('#map-holder').droppable({
            accept: '.scenario-block',
            hoverClass: 'map-container-drop',
            activeClass: 'map-container-droppable',
            activate: function( event, ui ) {
                $('#map-holder').closest('.panel').css('border','0');
            },
            deactivate: function( event, ui ) {
                $('#map-holder').closest('.panel').css('border','2px solid #ecf0f1');
            }
        });
        
    }
});