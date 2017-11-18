routerApp.factory('posDataService', function ($http, serviceBasePath) {
    var pos = {};

    pos.getMedicineStorage = function() {
        return $http.get(serviceBasePath + '/api/pharmacy/pos-data/medicine-storage');
    }
    pos.getSoldMedicine = function (range) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos-data/sold-medicine',range);
    }

    pos.getPurchasedMedicine = function (range) {
        return $http.post(serviceBasePath + '/api/pharmacy/pos-data/purchased-medicine',range);
    }
    
    return pos;
});