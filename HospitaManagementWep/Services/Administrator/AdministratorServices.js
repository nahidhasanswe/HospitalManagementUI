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

    //Pay Rerceive By Manager
    administrator.getUserListByName = function (name) {
        return $http.get(serviceBasePath + '/api/accounting/installment-receive/username-id/'+ name);
    }

    administrator.getAmountTobePaid = function (searchData) {
        return $http.post(serviceBasePath + '/api/accounting/installment-receive/data-to-pay-manager', searchData);
    }

    administrator.getAmountThatPaid = function (searchData) {
        return $http.post(serviceBasePath + '/api/accounting/installment-receive/paid-to-manager', searchData);
    }

    administrator.paymentReceiveByManager = function (payment) {
        return $http.post(serviceBasePath + '/api/accounting/installment-receive/save', payment);
    }

    return administrator;
});