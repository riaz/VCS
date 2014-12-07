angular.module('vcs').controller('HomeCtrl',function($scope, mapconfig, $firebase){
    // $scope.scenarios = [
    //     "abc",
    //     "sdfds"
    //     ];
    
    $scope.init = function(){
        $scope.addMap();
        $scope.drag_drop_init();
        $('[data-toggle="tooltip"]').tooltip();
        $scope.getScenarios();
    },
    
    $scope.getScenarios = function(){
        var ref = new Firebase("https://vcstest.firebaseio.com/scenarios");
        $scope.sync = $firebase(ref);
        // var profileObject = $scope.sync.$asArray();
        // profileObject.$bindTo($scope, "scenarios");
        $scope.scenarios = $scope.sync.$asArray();
        console.log($scope.scenarios);
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