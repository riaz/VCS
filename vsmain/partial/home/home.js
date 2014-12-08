/*global Firebase:false */
/*global google:false */
/*jshint -W030 */
angular.module('vcs').controller('HomeCtrl',['$scope', 'mapconfig', '$firebase','$timeout','firebaseurl','carimages',function($scope, mapconfig, $firebase,$timeout,firebaseurl,carimages){
    
    $scope.current_scenario = 'scenario1';
    $scope.ready = false;
    $scope.markers = [];
    $scope.circles = [];
    $scope.timers = [];
    $scope.colors = {
        green: '#00FF00',
        red: '#FF0000',
        yellow: '#FFFF00'
    },
    
    $scope.init = function(){
        $scope.addMap();
        $('[data-toggle="tooltip"]').tooltip();
        $scope.getScenarios();
    },
    
    $scope.getScenarios = function(){
        var ref_scearios = new Firebase(firebaseurl + 'scenarios');
        var sync_scearios = $firebase(ref_scearios);
        
        $scope.scenarios = sync_scearios.$asObject();
        
        $scope.scenarios.$loaded().then(function() {
            $timeout(function(){
                $scope.drag_drop_init();
                console.log($scope.scenarios);
            },1000);
        });
        
        var ref_scenarios_data = new Firebase(firebaseurl + 'scenarios_data');
        var sync_scenarios_data = $firebase(ref_scenarios_data);
        
        $scope.scenarios_data = sync_scenarios_data.$asObject();
        
        $scope.scenarios_data.$loaded().then(function() {
            $timeout(function(){
                $scope.drag_drop_init();
                console.log($scope.scenarios_data);
                $scope.ready = true;
            },1000);
        });
    },
    
    $scope.addMap = function(){
        $scope.google_map= new google.maps.Map(document.getElementById('map-holder'),
                    mapconfig.mapOptions);
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
            },
            drop: function(event, ui){
                $scope.current_scenario = ui.draggable.attr('data-scenario');
                // $scope.current_scenario_data = $scope.scenarios_data[i];
                $scope.getScenarioData();
                $scope.plotMarkers();
            }
        });
    }
    
    $scope.play = function(){
          
    },
    
    $scope.plotMarkers = function(){
        for(var i in $scope.current_scenario_data.cars){
            var icon = carimages.gray;
            var position = $scope.current_scenario_data.cars[i].directions[0];
            
            if($scope.current_scenario_data.cars[i].id == 'car1'){
                icon = carimages.yellow;
            }
            
            var marker = new google.maps.Marker({
                map:$scope.google_map,
                animation: google.maps.Animation.DROP,
                position: position,
                icon: icon
            });
            
            $scope.markers.push(marker);
            
            var circleOptions = {
                strokeColor: $scope.colors.green,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: $scope.colors.green,
                fillOpacity: 0.35,
                map: $scope.google_map,
                center: position,
                radius: 20
            };

            var circle = new google.maps.Circle(circleOptions);
            $scope.circles.push(circle);
            
            marker.setMap($scope.google_map);
            circle.setMap($scope.google_map);
        }  
    },
    
    $scope.stop = function(){
        
    },
    
    $scope.getScenarioData = function(){
        for(var i in $scope.scenarios_data){
            if($scope.scenarios_data[i].id==$scope.current_scenario){
                $scope.current_scenario_data = $scope.scenarios_data[i];
                return;
            }
        }
        if(typeof $scope.current_scenario_data == 'undefined'){
                $scope.current_scenario_data = $scope.scenarios_data[0];
        }
    };
}]);