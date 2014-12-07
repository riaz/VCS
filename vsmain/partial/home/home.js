angular.module('vcs').controller('HomeCtrl',function($scope, mapconfig, $firebase){
    $scope.scenarios = [];
    
    $scope.init = function(){
        $scope.addMap();
        $scope.drag_drop_init();
        $('[data-toggle="tooltip"]').tooltip();
        $scope.getScenarios();
    },
    
    $scope.getScenarios = function(){
        var ref = new Firebase("https://vcstest.firebaseio.com/");
          $scope.scenarios = $firebase(ref.child('scenarios')).$asArray();
          console.log($scope.scenarios);
          debugger;
          setTimeout(function(){
              debugger;
          },4000);
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