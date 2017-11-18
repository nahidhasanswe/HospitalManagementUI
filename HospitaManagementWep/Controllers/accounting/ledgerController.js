routerApp.controller('ledgerController', function ($scope, $location, groupService, ledgerService) {

    $scope.initButton = function () {
        $scope.createButton = 'Create Ledger';
        $scope.isProcessing = false;
    }
    $scope.initButton();

    $scope.ledgers = {}

    $scope.model = null;

    $scope.groups = [{ id: '', name: '' }];

    $scope.getGroups = function () {
        groupService.getGroups().then(function (response) {
                $scope.groups = response.data;
            },
            function (error) {
                swal('Error', error.error_description, 'error');
            });
    }

    $scope.balanceType = [{ id: '', name: '' }];
    $scope.getBalanceType = function () {
        ledgerService.getBalanceType().then(function (response) {
                $scope.balanceType = response.data;
            },
            function (error) {
                swal('Error', error.error_description, 'error');
            });
    }
    $scope.getBalanceType();

    $scope.selectedGroup = null;
    var id = '';
    $scope.afterSelectedGroup = function (selected) {
        if (selected) {
            $scope.selectedGroup = selected.originalObject;
            id = $scope.selectedGroup.id;
            console.log(id);
        }
    }
    $scope.getGroups();

    $scope.createLedger = function(invalid) {
        if (!id) {
            swal('Error', 'Please select Ledger Group', 'error');
            return false;
        }
        if (!invalid) {
            $scope.createButton = 'Creating...';
            $scope.isProcessing = true;
            var data = {
                name: $scope.model.name,
                balanceTypeId: $scope.model.balanceTypeId,
                InitialBalance: $scope.model.InitialBalance,
                description: $scope.model.description,
                groupId: id
            }
            ledgerService.createLedger(data).then(function(response) {
                    swal('Success', response.data, 'success');
                    $scope.initButton();
                    $scope.model = {};
                    $scope.getLedgers();
                },
                function(error) {
                    swal('Error', error.error_description, 'error');
                    $scope.initButton();
                });
        }
    }
    $scope.getLedgers = function() {
        ledgerService.getLedgers().then(function(response) {
            $scope.ledgers = response.data;
        }, function (err) {
            if (err.statusCode === 404) {
                toast.error("Page not found");
                return false;
            }
            swal('Error', err.data, 'error');
        });
    }
    $scope.editLedger = function(data) {
        $scope.model = data;
    }
})