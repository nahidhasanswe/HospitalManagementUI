routerApp.factory('medicineService', function ($http, serviceBasePath) {
    var medicines = {};

    medicines.saveMedicine = function(medicine) {
        return $http.post(serviceBasePath + '/api/pharmacy/medicine/save', medicine);
    }

    medicines.saveMedicineType = function (type) {
        return $http.post(serviceBasePath + '/api/pharmacy/medicine/type', type);
    }

    medicines.saveMedicineGroup = function (group) {
        return $http.post(serviceBasePath + '/api/pharmacy/medicine/group', group);
    }

    return medicines;
});