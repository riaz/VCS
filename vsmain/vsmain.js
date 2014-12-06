angular.module('vsmain', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('vsmain').config(function($stateProvider) {

    $stateProvider.state('home', {
        url: 'dsfd',
        templateUrl: 'vsmain/partial/home/home.html'
    });
    /* Add New States Above */

});

