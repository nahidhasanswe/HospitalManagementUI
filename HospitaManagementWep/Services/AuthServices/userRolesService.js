routerApp.factory('rolesFactory', function ($http, serviceBasePath) {

    var userRoles = {};
    userRoles.getAllRoleName = function () {
       return $http.get(serviceBasePath + '/api/roles');
    }
    userRoles.createRole = function(role) {
        return $http.post(serviceBasePath + '/api/roles/create', role);
    }
    userRoles.deleteRole = function(id) {
        return $http.delete(serviceBasePath + '/api/roles/' + id, { params: { id: id } });
    }
    return userRoles;
})