routerApp.factory('medicineDataService', function ($http, serviceBasePath) {
    var medicine = {};

    medicine.getMedicineById = function(id) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/medicine/' + id);
    }

    medicine.getMedicineByName = function (name) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/medicine/' + name);
    }

    medicine.getMedicineIdAndName = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/medicine-name-id');
    }

    medicine.GetAllMedicine = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/medicine');
    }

    medicine.GetMedicineGroupById = function (id) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/group/' + id);
    }

    medicine.getMedicineGroupByName = function (name) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/group/' + name);
    }

    medicine.getMedicineGroupIdAndName = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/group-name-id');
    }

    medicine.getAllMedicineGroup = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/groups');
    }

    medicine.getMedicineTypeById = function (id) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/type/' + id);
    }

    medicine.getMedicineTypeByName = function (name) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/type/' + name);
    }

    medicine.getMedicineTypeIdAndName = function (id) {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/type-name-id');
    }

    medicine.GetAllMedicineType = function () {
        return $http.get(serviceBasePath + '/api/pharmacy/medicine-data/types');
    }

    return medicine;
});