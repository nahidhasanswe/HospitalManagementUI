routerApp.factory('distributorService', function ($http, serviceBasePath) {
    var distributor = {};

    distributor.saveCompany = function(company) {
        return $http.post(serviceBasePath + '/api/pharmacy/distributor/company', company);
    }

    distributor.saveSupplier = function (supplier) {
        return $http.post(serviceBasePath + '/api/pharmacy/distributor/supplier', supplier);
    }

    distributor.getCompany = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/distributor-data/company');
    }

    distributor.getSupplier = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/distributor-data/supplier');
    }

    distributor.getCompanyNameAndId = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/distributor-data/company-id-name');
    }

    distributor.getSupplierNameAndId = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/distributor-data/supplier-id-name');
    }

    return distributor;
});