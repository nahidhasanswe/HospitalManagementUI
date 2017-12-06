routerApp.controller('doctorsMngController', function ($scope, $location, administratorService, toastr, $state, $uibModal) {

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
                toastr.error(error.data.message);
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
                toastr.error(error.data.message);
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
            size: 'md',
        });
    }

});

routerApp.controller('specialistMngController', function ($scope, $location, administratorService, toastr, $state) {

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
                toastr.error(error.data.message);
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
                toastr.error(error.data.message);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.cancel = function () {
        $scope.isUpdatable = false;
    }
});

routerApp.controller('paymentReceiveController', function ($scope, $location, administratorService, toastr, $state, serviceBasePath) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.searchButton = 'Search';
    }


    $scope.Search = {
        EmployeeId: '',
        userName: '',
        date : new Date()
    }

    $scope.searchResult = null;

    $scope.Payment = {
        receivedFrom: '',
        receivedDate: new Date(),
        amount: 0
    }

    $scope.SelectedEmployee = function (selected) {
        $scope.Search.EmployeeId = selected.originalObject.id;
        $scope.Search.userName = selected.originalObject.userName;
    }

    $scope.searhEmployeePayment = function (data, valid) {
        if (valid) {
            if (data.userName !== '') {
                $scope.searchButton = 'Searching...';
                $scope.isProcessing = true;
                var search = {
                    userName: data.userName,
                    date: data.date
                }
                administratorService.getAmountTobePaid(search).then(function (response) {
                    $scope.searchResult = response.data;
                    $scope.initButton();
                    if ($scope.searchResult == null) {
                        toastr.error('No data found');
                    }
                }, function (error) {
                    $scope.initButton();
                    toastr.error(error.data.message);
                })
            }
            else {
                toastr.error('Please provide required information');
            }
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateSpecialist = function (item) {
        $scope.updateSpecialist = {};
        angular.copy(item, $scope.updateSpecialist);
        $scope.isUpdatable = true;
    }

    $scope.paymentReceive = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            data.receivedFrom = $scope.Search.EmployeeId;
            administratorService.paymentReceiveByManager(data).then(function (response) {
                swal('Successful', 'The payment is successfully added', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }
});

routerApp.controller('auditReportController', function ($scope, $location, administratorService, serviceBasePath, toastr, $state) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initButton = function () {
        $scope.createButton = 'Search';
        $scope.isProcessing = false;
    }


    $scope.selectedUser = function (selectedItem) {
        $scope.searchData.userName = selectedItem.originalObject.userName;
    }

    $scope.getPaymentList = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Searching....';
            $scope.isProcessing = true;
            administratorService.getAmountThatPaid(data).then(function (response) {
                $scope.paymentList = response.data;
                $scope.initButton();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.searchData = {
        fromDate: new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)),
        toDate: new Date(),
        userName: ''
    };

});