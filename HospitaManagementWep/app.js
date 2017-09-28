var routerApp = angular.module('routerApp', ['ui.router', 'AuthApp', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngMessages', 'chieffancypants.loadingBar', 'ngAnimate']);

routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home',
            {
                url: '/home',
                templateUrl: '/views/partial-home.html',
                controller: 'homeController',
                authorize: false
            })
        .state('home.list',
            {
                url: '/list',
                templateUrl: '/views/partial-home-list.html',
                controller: 'homeListController'
            })
        .state('home.paragraph',
            {
                url: '/paragraph',
                template: '<h2>This is paragraph</h2>'
            })
        .state('login',
            {
                url: '/login',
                templateUrl: '/views/Authentication/SimplePage.html',
                controller: 'loginController'
            })
        .state('about',
            {
                url: '/about',
                views: {
                    '': { templateUrl: '/views/partial-about.html' },
                    'columnOne@about': { template: 'Look I am column one' },
                    'columnTwo@about': {
                        templateUrl: 'views/table-data.html',
                        controller: 'peopleController'
                    }
                }
            })
        .state('change',
            {
                url: '/change-password',
                controller: 'changeController'
            })
        .state('users',
            {
                url: '/users',
                controller: 'userController',
                templateUrl: '/views/Authentication/users.html'
        });
    $locationProvider.hashPrefix('');
});


/* Inject the AuthInterceptor Services */
routerApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

 

 

routerApp.run(function ($rootScope, $location, authService) {
    
    function getPath(route) { 
        if (!!route && typeof (route.originalPath) === "string")
            return "'" + route.originalPath + "'";
        return "[unknown route, using otherwise]";
    }
    $rootScope.$on("$stateChangeStart", function (evt, to, from) {
        if (to.authorize === true) {
            to.resolve = to.resolve || {};
            if (!to.resolve.authorizationResolver) {
                to.resolve.authorizationResolver = function (authService) {
                    return authService.getAuthInfo();

                };
            }
        }

    });

    $rootScope.$on("$stateChangeError", function (evt, to, from, error) {
        $location.path("/login").search("returnTo", to.originalPath);
    });

    // NOT needed in authorization / logging purposes only
    $rootScope.$on("$stateChangeSuccess", function (evt, to, from) {
         
    });
});


routerApp.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
});

/* Global Constant Domain Name for API */

routerApp.constant('serviceBasePath', 'http://localhost:51452');

//routerApp.run(function ($rootScope, $localtion) {
//    $rootScope.location = $localtion;
//});

routerApp.controller('homeListController',
    function($scope) {
        $scope.fruits = ['Apple', 'banana', 'Mango', 'Orange'];
    });

routerApp.controller('peopleController', function ($scope) {
    $scope.men = [
                    { name: 'Masud', age:28 },
                    { name: 'Rasel', age: 26 },
                    { name: 'Mehedee', age: 23 },
                    { name: 'Tultul', age: 21 }
                 ];
});

routerApp.controller('userController', function ($scope, userFactory) {
    $scope.getName = function () {
        userFactory.users().then(function (response) {
        $scope.users = response.data;
        }, function (error) {
            console.log(error.data.message);
            swal('Error', error.data.message, 'error');
        });
    }
   

    $scope.data = [
            {name:'masud', age:'32'},
            {name:'masud', age:'32'},
            {name:'masud', age:'32'}
    ];
});
