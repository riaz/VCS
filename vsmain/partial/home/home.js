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
            var position = $scope.current_scenario_data.cars[i].directions[0];
            
            icon = $scope.selectCar($scope.current_scenario_data.cars[i].moving,$scope.current_scenario_data.cars[i].id);

            if($scope.current_scenario_data.cars[i].startTime < 1000){ 
               
            }  

            var marker = new google.maps.Marker({
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
                center: position,
                radius: 20
            };

            var circle = new google.maps.Circle(circleOptions);
            $scope.circles.push(circle);
    
            if($scope.current_scenario_data.cars[i].startTime < 1000){ 
                marker.setMap($scope.google_map);
                circle.setMap($scope.google_map);
            }  
                
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