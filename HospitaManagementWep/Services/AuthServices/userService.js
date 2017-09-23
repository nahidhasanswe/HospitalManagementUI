
routerApp.factory('userFactory',function ($http, serviceBasePath) {

        var userData = {};
        userData.users = function() {
            return  $http.get(serviceBasePath + '/api/accounts/users');
        }
        return userData;
    })