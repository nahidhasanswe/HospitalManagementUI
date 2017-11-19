routerApp.factory('pathologyService', function ($http, serviceBasePath) {
    var pathology = {};

    pathology.savePathology = function (pathologyInfo) {
        return $http.post(serviceBasePath + '/api/pathology/pathology/save', pathologyInfo);
    }

    pathology.saveSpecialistName = function (name) {
        return $http.post(serviceBasePath + '/api/opd/doctor/save-speciality', name);
    }

    pathology.getPathologyList = function () {
        return $http.get(serviceBasePath + '/api/pathology/pathology-data/test-name-and-id');
    }

    pathology.getDoctorsList = function () {
        return $http.get(serviceBasePath + '/api/opd/doctor-data/doctors');
    }

    return pathology;
});