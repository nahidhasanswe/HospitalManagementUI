
routerApp.factory('userFactory', function ($http, serviceBasePath) {

    var userData = {};
    userData.users = function () {
        return $http.get(serviceBasePath + '/api/accounts/users');
    }

    userData.removeUser = function (userId) {
        return $http.delete(serviceBasePath + '/api/accounts/user/' + userId, { params: { userId: userId } });
    }
    return userData;
})