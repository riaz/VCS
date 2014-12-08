angular.module('vcs').constant('mapconfig', {
    mapOptions : {
        center: {
            lat: 51.899,
            lng: -8.471200000000001
        },
        streetViewControl: false,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        zoom: 18,
        minZoom: 18,
        maxZoom:18
    }
});

angular.module('vcs').constant('firebaseurl', 'https://vcstest.firebaseio.com/');

angular.module('vcs').constant('carimages', {
        gray : {
            url: 'images/car-gray.png',
            size: new google.maps.Size(18, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(9, 18)
        },
        
        gray_l_90 : {
            url: 'images/car-gray-90-l.png',
            size: new google.maps.Size(36, 18),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(18, 9)
        },
        
        gray_r_90 : {
            url: 'images/car-gray-90-r.png',
            size: new google.maps.Size(36, 18),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(18, 9)
        },
        
        yellow : {
            url: 'images/car-yellow.png',
            size: new google.maps.Size(18, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(9, 18)
        },
        
        yellow_l_90 : {
            url: 'images/car-yellow-90-l.png',
            size: new google.maps.Size(36, 18),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(18, 9)
        },
        
        yellow_r_90 : {
            url: 'images/car-yellow-90-r.png',
            size: new google.maps.Size(36, 18),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(18, 36)
        },
        
});