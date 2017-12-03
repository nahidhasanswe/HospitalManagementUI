routerApp.factory('healthEquipmentService', function ($http, serviceBasePath) {
    var equipment = {};

    equipment.purchaseEquipment = function (patientInfo) {
        return $http.post(serviceBasePath + '/api/health-equipment/equipment/purchase-equipment', patientInfo);
    }

    equipment.getEquipmentList = function () {
        return $http.get(serviceBasePath + '/api/health-equipment/data/equipment');
    }

    equipment.saveEquipment = function (equipment) {
        return $http.post(serviceBasePath + '/api/health-equipment/equipment/save', equipment);
    }

    

    return equipment;
});