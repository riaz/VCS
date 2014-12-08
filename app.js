angular.module('vcs', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'vsmain', 'firebase']);

angular.module('vcs').config(function($stateProvider, $urlRouterProvider) {
    
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'vsmain/partial/home/home.html'
        });

});

angular.module('vcs').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
