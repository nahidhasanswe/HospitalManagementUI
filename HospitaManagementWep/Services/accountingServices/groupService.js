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

    groups.saveMISName = function (data) {
        return $http.post(serviceBasePath + '/api/mis/mis/save-mis', data);
    }

    groups.saveChartOfAccounting = function (data) {
        return $http.post(serviceBasePath + '/api/mis/mis/save-chart-of-account', data);
    }

    groups.getMISNameList = function () {
        return $http.get(serviceBasePath + '/api/accounting/mis-data/all-mis');
    }

    groups.getChartOfAccounting = function () {
        return $http.get(serviceBasePath + '/api/accounting/mis-data/chart-of-account-mapping');
    }


    return groups;
});