/*global Firebase:false */
/*global google:false */
/*jshint -W030 */
angular.module('vcs').controller('HomeCtrl',['$scope', 'mapconfig', '$firebase','$timeout','firebaseurl','carimages',function($scope, mapconfig, $firebase,$timeout,firebaseurl,carimages){
    $scope.speed = 10000;
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
                $scope.$apply(function(){
                    $scope.current_scenario = ui.draggable.attr('data-scenario');
                });
                
                // $scope.current_scenario_data = $scope.scenarios_data[i];
                $scope.getScenarioData();
                $scope.plotMarkers();
            }
        });
    },
    
    $scope.play = function(){
         window.cars = [];
         for(var i in $scope.markers){
             if($scope.markers[i].startTime !== 0){
                 $timeout(function(){
                     if($scope.markers[i]){
                        $scope.markers[i].setMap($scope.google_map);
                        $scope.circles[i].setMap($scope.google_map);
                     }
                 },Math.floor($scope.markers[i].startTime));
             }
         }
         
         $scope.playCars();
    },
    
    $scope.playCars = function(){
        debugger;
        // for(var i in $scope.markers){
            $scope.timers[0] = setInterval(function () {
            var directions = $scope.markers[0].directions;
            if($scope.markers[0].currentFrame < $scope.markers[0].directions.length){
                $scope.markers[0].setPosition($scope.markers[0].directions[$scope.markers[0].currentFrame]);
                $scope.circles[0].setCenter($scope.markers[0].directions[$scope.markers[0].currentFrame]);
                $scope.markers[0].currentFrame++;
                $scope.google_map.panTo($scope.markers[0].directions[$scope.markers[0].currentFrame]);
                console.log($scope.markers[1].currentFrame);
                if(directions[$scope.markers[0].currentFrame].turn == 'left'){
                    $scope.markers[0].setIcon(carimages.yellow_l_90);
                    
                    var circleOptions = {
                    strokeColor: $scope.colors.red,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: $scope.colors.red,
                    fillOpacity: 0.35,
                    center: directions[$scope.markers[0].currentFrame],
                    radius: 20
                    };
                    
                    $scope.circles[0].setMap(null);
                    // $scope.circles[1].setMap(null);

                    var circleOptionsNew = {
                        strokeColor: $scope.colors.red,
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: $scope.colors.red,
                        fillOpacity: 0.35,
                        center: directions[$scope.markers[1].currentFrame],
                        radius: 20
                    };
                    
                    var circle = new google.maps.Circle(circleOptions);
                    var circleNew = new google.maps.Circle(circleOptionsNew);
                    $scope.circles[0] = circle;
                    $scope.circles[1] = circleNew;
                    circle.setMap($scope.google_map);
                }
                
                if(directions[$scope.markers[0].currentFrame].turn == 'up'){
                    $scope.markers[0].setIcon(carimages.yellow);
                    
                }
            }
            }, Math.floor($scope.speed/$scope.markers[0].speed));  
            
            $timeout(function(){
                $scope.timers[1] = setInterval(function () {
                var directions = $scope.markers[1].directions;
                if($scope.markers[1].currentFrame < $scope.markers[1].directions.length){
                    $scope.markers[1].setPosition($scope.markers[1].directions[$scope.markers[1].currentFrame]);
                    $scope.circles[1].setCenter($scope.markers[1].directions[$scope.markers[1].currentFrame]);
                    $scope.markers[1].currentFrame++;
                }
                }, Math.floor($scope.speed/$scope.markers[1].speed));  
            // }
            },Math.floor($scope.markers[1].startTime))
    },
    
    $scope.selectCar = function(direction,car){
        var icon = '';
        if(car == 'car1'){
            switch(direction) {
                case 'east':
                    icon = carimages.yellow_r_90;  
                    break;
                case 'west':
                    icon = carimages.yellow_l_90;
                    break;
                case 'north':
                    icon = carimages.yellow;
                    break;
                case 'south':
                    break;
            }            
        }
        else{
            switch(direction) {
                case 'east':
                    icon = carimages.gray_r_90;
                    break;
                case 'west':
                    icon = carimages.gray_l_90;
                    break;
                case 'north':
                    icon = carimages.gray;
                    break;
                case 'south':
                    break;
            }
        }
        return icon;
    },
    
    $scope.plotMarkers = function(){
        for(var i in $scope.current_scenario_data.cars){
            var icon = carimages.gray;
            var marker;
            var circle;
            var position = $scope.current_scenario_data.cars[i].directions[0];
            
            icon = $scope.selectCar($scope.current_scenario_data.cars[i].moving,$scope.current_scenario_data.cars[i].id);

            marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                position: position,
                icon: icon,
                startTime: $scope.current_scenario_data.cars[i].startTime,
                speed: $scope.current_scenario_data.cars[i].speed,
                directions: $scope.current_scenario_data.cars[i].directions,
                currentFrame: 0,
                car:$scope.current_scenario_data.cars[i].id
            });
            
            $scope.markers.push(marker);
            
            var circleOptions = {
                strokeColor: $scope.colors.green,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: $scope.colors.green,
                fillOpacity: 0.35,
                center: position,
                radius: 20
            };

            circle = new google.maps.Circle(circleOptions);
            $scope.circles.push(circle);
    
            if($scope.current_scenario_data.cars[i].startTime < 1000){ 
                marker.setMap($scope.google_map);
                circle.setMap($scope.google_map);
            }          
        }
    },
    
    $scope.stop = function(){
        $scope.current_scenario_data ={};
        $scope.google_map= new google.maps.Map(document.getElementById('map-holder'),
                    mapconfig.mapOptions);
        $scope.current_scenario  = '';
        clearInterval($scope.timers[0]);
        clearInterval($scope.timers[1]);
        $scope.markers = [];
        $scope.circles = [];
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