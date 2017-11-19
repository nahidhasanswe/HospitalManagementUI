routerApp.controller('addExpensesController', function ($scope, $location, administratorService, toastr, $state, $uibModal) {

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.updateButton = 'Update';
        $scope.isUpdatable = false;
    }

    $scope.dataLoad = function () {
        administratorService.getSpecialist().then(function (response) {
            $scope.specialistItems = response.data;
        });

        administratorService.getDoctorsList().then(function (response) {
            $scope.doctorList = response.data;
        });
    }

    $scope.dataLoad();

    $scope.saveDoctor = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            administratorService.saveDoctor(data).then(function (response) {
                swal('Success', 'Successfully added Doctor', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.updateDoctorInformation = function (data, valid) {
        if (valid) {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            administratorService.saveDoctor(data).then(function (response) {
                swal('Success', 'Successfully updated Doctor Information', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateDoctorInfo = function (data) {
        $scope.updateDoctor = {};
        angular.copy(data, $scope.updateDoctor)

        $scope.isUpdatable = true;
    }

    $scope.cancelUpdate = function () {
        $scope.isUpdatable = false;
    }

    $scope.ViewDoctorInformation = function (data) {
        $scope.doctorInfo = {};
        angular.copy(data, $scope.doctorInfo);

        var modalInstance = $uibModal.open({
            templateUrl: 'views/Administrator/doctorInfoModal.html',
            controller: 'doctorsMngController',
            scope: $scope,
            backdrop: 'static',
            backdropClass: 'ModalBackdrop',
            size: 'md',
        });
    }

});

routerApp.controller('viewExpensesController', function ($scope, $location, administratorService, toastr, $state) {

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.isUpdatable = false;
        $scope.updateButton = 'Update';
    }

    $scope.dataLoad = function () {
        administratorService.getSpecialist().then(function (response) {
            $scope.specialistItems = response.data;
        });
    }

    $scope.dataLoad();

    $scope.saveSpecialistName = function (data, valid) {
        if (valid) {
            $scope.createButton = 'saving....';
            $scope.isProcessing = true;
            administratorService.saveSpecialistName(data).then(function (response) {
                swal('Successful', 'The specialist name is successfully added', 'success');
                $scope.initButton();
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateSpecialist = function (item) {
        $scope.updateSpecialist = {};
        angular.copy(item, $scope.updateSpecialist);
        $scope.isUpdatable = true;
    }

    $scope.updateSpecialistName = function (data, valid) {
        if (valid) {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            administratorService.saveSpecialistName(data).then(function (response) {
                swal('Successful', 'The specialist name is successfully updated', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.cancel = function () {
        $scope.isUpdatable = false;
    }
});