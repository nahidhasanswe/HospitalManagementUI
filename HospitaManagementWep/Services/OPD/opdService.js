routerApp.factory('opdService', function ($http, serviceBasePath) {
    var opd = {};

    opd.admitPatient = function (patientInfo) {
        return $http.post(serviceBasePath + '/api/opd/patient/admission', patientInfo);
    }

    opd.getSpecialists = function () {
        return $http.get(serviceBasePath + '/api/opd/doctor-data/speciality');
    }

    opd.getSpecialistDoctor = function (id) {
        console.log(id);
        return $http.get(serviceBasePath + '/api/opd/doctor-data/doctor-name-id/' + id);
    }

    opd.saveAppointment = function (data) {
        return $http.post(serviceBasePath + '/api/opd/doctor/appointment', data);
    }

    opd.savePathologyTestSale = function (data) {
        return $http.post(serviceBasePath + '/api/ipd/ipd-pos/diagnosis-test-sale', data);
    }

        

    

    return opd;
});