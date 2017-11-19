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
                toastr.error('Internal Server Problem');
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
                toastr.error('Internal Server Problem');
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

routerApp.controller('purchaseIngradiantController', function ($scope, $location, administratorService, toastr, $state) {

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