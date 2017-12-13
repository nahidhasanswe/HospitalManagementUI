routerApp.controller('voucherController', function ($scope, voucherService, ledgerService, groupService, toastr) {

    $scope.buttonInit = function () {
        $scope.createButton = 'Save voucher';
        $scope.isProcessing = false;
        $scope.bt = 'Debit';
    }

    $scope.buttonInit();

    $scope.changeBT = function () {
        if ($scope.bt == 'Debit') {
            $scope.bt = 'Credit';
        } else {
            $scope.bt = 'Debit';
        }
    }

    $scope.getGroups = function () {
        ledgerService.getLedgers().then(function (response) {
            $scope.groups = response.data;
        },
            function (error) {
                swal('Error', error.data.message, 'error');
            });
    }
    $scope.selectedVoucher = null;
    var id = '';
    var name = '';
    $scope.afterSelectedGroup = function (selected) {
        if (selected) {
            $scope.selectedVoucher = selected.originalObject;
            id = $scope.selectedVoucher.id;
            name = $scope.selectedVoucher.name;
            console.log(id);
        }
    }
    $scope.getGroups();

    $scope.model = {
        transactionDate: $scope.transactionDate,
        AccVoucherDetails: []
    } 
        $scope.tableData = {
            ledgerId: '',
            Debit: 0,
            Credit: 0
        };
    $scope.sumDr = parseFloat(0);
    $scope.sumCr = parseFloat(0);

    $scope.insert = function () {
        $scope.tableData.ledgerId = id;
        $scope.tableData.ledgerName = name;
        $scope.tableData.Debit = $scope.sub.debit == null ? 0 : $scope.sub.debit;
        $scope.tableData.Credit = $scope.sub.credit == null ? 0 : $scope.sub.credit;
        $scope.sumDr += parseFloat($scope.tableData.Debit);
        $scope.sumCr += parseFloat($scope.tableData.Credit);
        $scope.model.AccVoucherDetails.push($scope.tableData);
        toastr.success('Success', 'Ledger added successfylly!');
        $scope.tableData = {};
        console.log($scope.model);
        $scope.sub.credit = 0;
        $scope.sub.debit = 0;
    }
    $scope.createJournalVoucher = function() {
        if ($scope.sumDr != $scope.sumCr) {
            swal('Error', 'Debit and Credit is not equal!', 'error');
            return false;
        }
        if ($scope.transactionDate == null) {
            swal('Error', 'Transaction date is required!', 'error');
            return false;
        }
        $scope.createButton = 'Saving...';
        $scope.isProcessing = true;
            $scope.model.transactionDate = $scope.transactionDate;
            $scope.model.narration = $scope.narration; 
        voucherService.createJournalVoucher($scope.model).then(function(response) {
                $scope.voucherNumber = response.data;
                swal('Success', 'Voucher saved succefullty', 'success');
                $scope.buttonInit();
                $scope.model = {};
                $scope.sumDr = parseFloat(0);
                $scope.sumCr = parseFloat(0);
            },
            function(error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonInit();
            });
    }

    $scope.createPaymentVoucher = function () {
        if ($scope.sumDr != $scope.sumCr) {
            swal('Error', 'Debit and Credit is not equal!', 'error');
            return false;
        }
        if ($scope.transactionDate == null) {
            swal('Error', 'Transaction date is required!', 'error');
            return false;
        }
        $scope.createButton = 'Saving...';
        $scope.isProcessing = true;
        $scope.model.transactionDate = $scope.transactionDate;
        $scope.model.narration = $scope.narration;
        voucherService.createPaymentVoucher($scope.model).then(function (response) {
                $scope.voucherNumber = response.data;
                swal('Success', 'Voucher saved succefullty', 'success');
                $scope.buttonInit();
                $scope.model = {};
                $scope.sumDr = parseFloat(0);
                $scope.sumCr = parseFloat(0);
            },
            function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonInit();
            });
    } 

    $scope.createReceiveVoucher = function () {
        if ($scope.sumDr != $scope.sumCr) {
            swal('Error', 'Debit and Credit is not equal!', 'error');
            return false;
        }
        if ($scope.transactionDate == null) {
            swal('Error', 'Transaction date is required!', 'error');
            return false;
        }
        $scope.createButton = 'Saving...';
        $scope.isProcessing = true;
        $scope.model.transactionDate = $scope.transactionDate;
        $scope.model.narration = $scope.narration;
        voucherService.createReceiveVoucher($scope.model).then(function (response) {
                $scope.voucherNumber = response.data;
                swal('Success', 'Voucher saved succefullty', 'success');
                $scope.buttonInit();
                $scope.model = {};
                $scope.sumDr = parseFloat(0);
                $scope.sumCr = parseFloat(0);
            },
            function (error) {
                swal('Error', error.data.message, 'error');
                $scope.buttonInit();
            });
    }
})