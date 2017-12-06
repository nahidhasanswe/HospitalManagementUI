routerApp.controller('pathologyController', function ($scope, $location, pathologyService, toastr, $state, $uibModal) {

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.updateButton = 'Update';
        $scope.isUpdatable = false;
    }

    $scope.dataLoad = function () {
        pathologyService.getPathologyList().then(function (response) {
            $scope.pathologyList = response.data;
        });
    }

    $scope.dataLoad();

    $scope.savePathology = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            pathologyService.savePathology(data).then(function (response) {
                swal('Success', 'Successfully added Pathology Test', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.updatedPathologyInformation = function (data, valid) {
        if (valid) {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            pathologyService.savePathology(data).then(function (response) {
                swal('Success', 'Successfully Updated Pathology Test', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdatePathlogyInfo = function (data) {
        $scope.updatePathology = {};
        angular.copy(data, $scope.updatePathology)

        $scope.isUpdatable = true;
    }

    $scope.cancelUpdate = function () {
        $scope.isUpdatable = false;
    }

});

routerApp.controller('purchaseIngradiantController', function ($scope, serviceBasePath, pathologyService, toastr, $state, ipdService, reportCreate) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initialObject = function () {
        $scope.purchaseIngradiant = {
            TransactionDate: new Date(),
            Total: 0,
            Discount: 0,
            Vat: 0,
            Due: 0,
            Paid: 0,
            EquipmentPurchases: []
        };

        $scope.equipment = {
            EquipmentId: '',
            name: '',
            Rate: 0,
            quantity: 0,
            MeasurementUnit: ''
        };

        ipdService.getMeasurementUnit().then(function (response) {
            $scope.measurementUnitList = response.data;
        })
    }

    $scope.initialObject();

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
            $scope.purchaseIngradiant.EquipmentPurchases.push(data);
            $scope.equipment = {
                EquipmentId: '',
                name: '',
                Rate: 0,
                quantity: 0,
                MeasurementUnit: ''
            };
        } else {
            toastr.error('Please provide proper information');
        }
    }

    $scope.removeEquipment = function (index) {
        $scope.purchaseIngradiant.EquipmentPurchases.splice(index, 1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.purchaseIngradiant.EquipmentPurchases, function (item) {
            sum = sum + (item.Rate * item.Quantity);
        })
        return sum + $scope.purchaseIngradiant.Vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.purchaseIngradiant.Discount - $scope.purchaseIngradiant.Paid;
    }

    $scope.savedPurchaseIngradiant = function (data) {
        if (data.patientId == '' && data.PatientAdmId == '') {
            toastr.error('Provide proper information');
        } else {
            $scope.submitButton = 'Submitting....';
            $scope.isProcessing = true;

            data.Total = $scope.getTotal();
            data.Due = $scope.getDue();
            pathologyService.savePurchaseIngradiant(data).then(function (response) {
                swal('Successful', 'Successfully added !!', 'success');
                $state.reload();
                viewReport(response.data);
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
            });
        }
    }


    function viewReport(data) {
        reportCreate.purchaseIngradiant(data);
    }
});

routerApp.controller('saveLaboratoryEquipmentController', function ($scope, serviceBasePath, pathologyService, toastr, $state, ipdService, reportCreate) {

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.updateButton = 'Update';
        $scope.isUpdatable = false;
    }

    $scope.dataLoad = function () {
        pathologyService.getLaboratoryEquipment().then(function (response) {
            $scope.equipmentList = response.data;
        });
    }

    $scope.dataLoad();

    $scope.saveLaboratoryEquipment = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            pathologyService.saveLaboratoryEquipment(data).then(function (response) {
                swal('Success', 'Successfully added Laboratory Equipment', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.updatedPathologyInformation = function (data, valid) {
        if (valid) {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            pathologyService.saveLaboratoryEquipment(data).then(function (response) {
                swal('Success', 'Successfully Updated Laboratory Equipment Info', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateLaboratoryEquipment = function (data) {
        $scope.updateEquipment = {};
        angular.copy(data, $scope.updateEquipment)

        $scope.isUpdatable = true;
    }

    $scope.cancelUpdate = function () {
        $scope.isUpdatable = false;
    }
});