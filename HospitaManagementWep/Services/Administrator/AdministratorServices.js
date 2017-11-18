routerApp.factory('administratorService', function ($http, serviceBasePath) {
    var administrator = {};

    administrator.saveDoctor = function (doctorInfo) {
        return $http.post(serviceBasePath + '/api/opd/doctor/save', doctorInfo);
    }

    administrator.saveSpecialistName = function (name) {
        return $http.post(serviceBasePath + '/api/opd/doctor/save-speciality', name);
    }

    administrator.getSpecialist = function () {
        return $http.get(serviceBasePath + '/api/opd/doctor-data/speciality');
    }

    administrator.getDoctorsList = function () {
        return $http.get(serviceBasePath + '/api/opd/doctor-data/doctors');
    }

    return administrator;
});