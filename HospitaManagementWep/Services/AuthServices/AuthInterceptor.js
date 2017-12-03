'use strict';

var AuthApp = angular.module('AuthApp', ['LocalStorageModule']);


// Global Variable for base path
AuthApp.constant('serviceBasePath', 'http://masud.azurewebsites.net');

AuthApp.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    authInterceptorServiceFactory.request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    authInterceptorServiceFactory.responseError = function (rejection) {
        if (rejection.status == 403) {
            $location.path('/home');
        } else if (rejection.status == 401) {
            localStorageService.remove('authorizationData');
            var currentRoute = $location.path();
            $location.path("/login").search("returnTo", currentRoute);
        }
        return $q.reject(rejection);
    };

    return authInterceptorServiceFactory;

}]);


AuthApp.factory('authService', ['$http', '$q', 'localStorageService', 'serviceBasePath', function ($http, $q, localStorageService, serviceBasePath) {
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    authServiceFactory.getAuthInfo = function () {
        
        var token = localStorageService.get('authorizationData');
        
        if (token) {
            return true;
        } else
            //throw new NotImplementedError('Unauthenticate');
            return false;
    }

    authServiceFactory.isAuthenticated = function () {

        var token = localStorageService.get('authorizationData');

        //if (token) {
        //    return !jwtHelper.isTokenExpired(token);
        //} else
        //    return false;
    }

 

    authServiceFactory.getRoleName = function () {

        var authData = localStorageService.get('authorizationData');

        var auth = {
            Role: 'Anonymous',
            Name: 'Anonymous User'
        }

        if (authData) {
            auth.Role = authData.Role;
            auth.Name = authData.userName;
            return auth;
        } else
            return auth;
    }

    function NotImplementedError(message) {
        this.name = "Authentication and Authorization";
        this.message = (message || "");
    }
    NotImplementedError.prototype = Error.prototype;

    authServiceFactory.saveRegistration = function (registration) {

        //authServiceFactory.logOut();

        return $http.post(serviceBasePath + '/api/accounts/create', registration);
    };

    
    authServiceFactory.login = function (loginData) {

        var obj = { 'username': loginData.userName, 'password': loginData.password, 'grant_type': 'password' };

        Object.toparams = function ObjectsToParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        }

        var deferred = $q.defer();

        $http({
            method: 'post',
            url: serviceBasePath + "/oauth/token",
            data: Object.toparams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function(response) {
                var storage = {
                    token: response.data.access_token,
                    userName: response.data.userName,
                    Role: response.data.Role
                }

                localStorageService.set('authorizationData', storage, 'localStorage');

                deferred.resolve(response);
            },
            function(error) {
                deferred.reject(error.data);
            });
        return deferred.promise;
    }

    authServiceFactory.logOut = function () {

        localStorageService.remove('authorizationData');

    };

    authServiceFactory.fillAuthData = function () {
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
        }
        else {
            _authentication.isAuth = false;
        }
    };

    authServiceFactory.changePassword = function (passwordData) {

        return $http.post(serviceBasePath + '/api/Accounts/ChangePassword', passwordData);
    };

    authServiceFactory.recoverPassword = function (passwordData) {

        return $http.post(serviceBasePath + '/api/Accounts/RecoveryPassword', passwordData);
    };

    authServiceFactory.getData = function () {

        $http.get(serviceBasePath + '/api/Accounts/getUserInfo').then(function (response) {
            return response.data;
        });
    };

    authServiceFactory.ForgotPassword = function (data) {
        return $http.post(serviceBasePath + '/api/Accounts/ForgotPassword', data);
    };

    authServiceFactory.ResetPassword = function (data) {
        return $http.post(serviceBasePath + '/api/Accounts/ResetPassword', data);
    };

    return authServiceFactory;
}]);