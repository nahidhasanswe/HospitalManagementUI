routerApp.controller('healthEquipmentController', function ($scope, healthEquipmentService, toastr, ipdService, $state) {

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.updateButton = 'Update';
        $scope.isUpdatable = false;
    }

    $scope.dataLoad = function () {
        healthEquipmentService.getEquipmentList().then(function (response) {
            $scope.equipmentList = response.data;
        });

        ipdService.getMeasurementUnit().then(function (response) {
            $scope.measurementUnitList = response.data;
        });
    }

    $scope.dataLoad();

    $scope.saveEquipment = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            healthEquipmentService.saveEquipment(data).then(function (response) {
                swal('Success', 'Successfully added Health Equipment', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.updatedEquipmentInformation = function (data, valid) {
        if (valid) {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            healthEquipmentService.saveEquipment(data).then(function (response) {
                swal('Success', 'Successfully Updated Equipment Info', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateEquipmentInfo = function (data) {
        $scope.updateEquipment = {};
        angular.copy(data, $scope.updateEquipment)

        $scope.isUpdatable = true;
    }

    $scope.cancelUpdate = function () {
        $scope.isUpdatable = false;
    }


});

routerApp.controller('purchaseHealthEquipmentController', function ($scope, healthEquipmentService, toastr, ipdService, serviceBasePath, distributorService, $state, reportCreate ) {
    $scope.serverBasePath = serviceBasePath;

    $scope.initialObject = function () {
        $scope.purchaseEquipment = {
            TransactionDate: new Date(),
            Total: 0,
            supplierId: '',
            Discount: 0,
            Vat: 0,
            Due: 0,
            Paid: 0,
            HospitalityEquipmentPurchases: []
        };

        $scope.equipment = {
            EquipmentId: '',
            name: '',
            Rate: 0,
            Quantity: 0,
            MeasurementUnit: ''
        };

        ipdService.getMeasurementUnit().then(function (response) {
            $scope.measurementUnitList = response.data;
        });

        distributorService.getSupplier().then(function (response) {
            $scope.supplier = response.data;
        });
    }

    $scope.initialObject();

    $scope.SelectedSupplier = function (selectedItem) {
        var item = selectedItem.originalObject;
        $scope.purchaseEquipment.supplierId = item.id;
    }

    $scope.initial = function () {
        $scope.submitButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.selectedEquipment = function (selectedData) {
        var data = selectedData.originalObject;
        $scope.equipment.EquipmentId = data.id;
        $scope.equipment.name = data.name;
        $scope.equipment.Rate = data.saleRate;
        $scope.equipment.Quantity = 1;
    }

    $scope.addEquipment = function (data, valid) {
        if (valid) {
            $scope.purchaseEquipment.HospitalityEquipmentPurchases.push(data);
            $scope.equipment = {
                EquipmentId: '',
                name: '',
                Rate: 0,
                Quantity: 0,
                MeasurementUnit: ''
            };
        } else {
            toastr.error('Please provide proper information');
        }
    }

    $scope.removeEquipment = function (index) {
        $scope.purchaseEquipment.HospitalityEquipmentPurchases.splice(index, 1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.purchaseEquipment.HospitalityEquipmentPurchases, function (item) {
            sum = sum + (item.Rate * item.Quantity);
        })
        return sum + $scope.purchaseEquipment.Vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.purchaseEquipment.Discount - $scope.purchaseEquipment.Paid;
    }

    $scope.savePurchaseEquipment = function (data) {
        if (data.supplierId == '') {
            toastr.error('Provide proper information');
        } else {
            $scope.submitButton = 'Submitting....';
            $scope.isProcessing = true;

            data.Total = $scope.getTotal();
            data.Due = $scope.getDue();

            healthEquipmentService.purchaseEquipment(data).then(function (response) {
                swal('Successful', 'Successfully added !!', 'success');
                $state.reload();
                reportCreate.IpdEquipmentRequision(response.data);
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
            });
        }
    }
});