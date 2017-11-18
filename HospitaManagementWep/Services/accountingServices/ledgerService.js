routerApp.factory('ledgerService', function($http, serviceBasePath) {
    var ledgers = {};

    ledgers.getBalanceType = function() {
        return $http.get(serviceBasePath + '/api/accounting/ledger-data/balance-type');
    }
    ledgers.createLedger = function(data) {
        return $http.post(serviceBasePath + '/api/accounting/ledger/create', data);
    }

    ledgers.getLedgers = function () {
        return $http.get(serviceBasePath + '/api/accounting/ledger-data/ledgers');
    }
    ledgers.getLedgerWithId = function () {
        return $http.get(serviceBasePath + '/api/accounting/ledger-data/ledger-name-id');
    }
    return ledgers;
});