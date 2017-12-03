routerApp.factory('ipdService', function ($http, serviceBasePath) {
    var ipd = {};

    ipd.admitPatient = function(patientInfo) {
        return $http.post(serviceBasePath + '/api/ipd/patient/admission', patientInfo);
    }

    ipd.getDoctorsListForReference = function () {
        return $http.get(serviceBasePath + '/api/ipd/service-provider-data/doctors-name-and-id');
    }

    ipd.getAgentListForReference = function () {
        return $http.get(serviceBasePath + '/api/ipd/service-provider-data/agents-name-and-id');
    }
    
    ipd.getIPDPatientList = function () {
        return $http.get(serviceBasePath + '/api/ipd/patient-data/admited-patient');
    }

    ipd.getPatientById = function (id) {
        return $http.get(serviceBasePath + '/api/ipd/patient-data/patient-summery/' + id);
    }

    ipd.dischargePatient = function (data) {
        return $http.post(serviceBasePath + '/api/ipd/patient/patient-discharge', data);
    }

    ipd.addMedicineRequisition = function (data) {
        return $http.post(serviceBasePath + '/api/ipd/ipd-pos/medicine-requisition', data);
    }

    ipd.addPathologyRequisition = function (data) {
        return $http.post(serviceBasePath + '/api/ipd/ipd-pos/diagnosis-test-requisition', data);
    }

    ipd.addEquipmentRequisition = function (data) {
        return $http.post(serviceBasePath + '/api/ipd/ipd-pos/health-equipment-requisition', data);
    }

    ipd.getMeasurementUnit = function () {
        return $http.get(serviceBasePath + '/api/health-equipment/data/measurment-unit');
    }

    ipd.getDischargePatientList = function(data) {
        return $http.post(serviceBasePath + '/api/ipd/patient-data/discharged-patient', data);
    }

    ipd.getPaymentInfo = function (admissionId) {
        return $http.get(serviceBasePath + '/api/ipd/ipd-pos-data/admission-data/' + admissionId);
    }

    ipd.duePayment = function (paymentInfo) {
        return $http.post(serviceBasePath + '/api/ipd/ipd-pos/pay-indoor-due', paymentInfo);
    }

    return ipd;
});