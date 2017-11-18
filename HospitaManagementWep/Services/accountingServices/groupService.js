routerApp.factory('groupService', function ($http, serviceBasePath) {
    var groups = {};
    groups.getGroups = function() {
        return $http.get(serviceBasePath + '/api/accounting/group-data');
    }
    groups.getNature = function() {
        return $http.get(serviceBasePath + '/api/accounting/group-data/nature');
    }

    groups.createGroup = function (data) {
        return $http.post(serviceBasePath + '/api/accounting/group/create', data);
    }

    return groups;
});