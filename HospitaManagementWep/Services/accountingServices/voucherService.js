routerApp.factory('voucherService',function($http, serviceBasePath) {
    var voucher = {};

    voucher.createJournalVoucher = function (voucher) {
        return $http.post(serviceBasePath + '/api/accounting/voucher/journal-voucher', voucher);
    }

    voucher.createPaymentVoucher = function (voucher) {
        return $http.post(serviceBasePath + '/api/accounting/voucher/payment-voucher', voucher);
    }

    voucher.createReceiveVoucher = function (voucher) {
        return $http.post(serviceBasePath + '/api/accounting/voucher/receive-voucher', voucher);
    }

    return voucher;
});