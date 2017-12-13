routerApp.factory('posService', function ($http, serviceBasePath) {
    var pos = {};

    pos.saleMedicine = function(invoice) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos/sale-medicine', invoice);
    }

    pos.purchaseMedicine = function (invoice) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos/purchase-medicine', invoice);
    }

    pos.saleReturnMedicine = function (invoice) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos/return-sale-medicine', invoice);
    }

    pos.getCustomerList = function () {
        return $http.get(serviceBasePath + '/api/ipd/patient-data/all-patient');
    }

    return pos;
});

routerApp.factory('medicinePaymentService', function ($http, serviceBasePath) {
    var medicinePayment = {};

    medicinePayment.getPatientData = function (patientData) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos-data/pharmacy-due', patientData);
    }

    medicinePayment.dueMedicinePayment = function (paymentData) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos/pay-pharmacy-due', paymentData);
    }

    return medicinePayment;
});