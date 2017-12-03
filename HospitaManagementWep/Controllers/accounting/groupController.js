routerApp.controller('groupController', function ($scope, $uibModal, authService, $location,  groupService) {

    $scope.initButton = function() {
        $scope.createButton = 'Create Group';
        $scope.isProcessing = false;
    }
    $scope.initButton();

    $scope.model = null;

    $scope.groups = [{ id: '', name: '' }];
    $scope.selectedGroup = null;
    var id = '';
    $scope.afterSelectedGroup = function (selected) {
        if (selected) {
            $scope.selectedGroup = selected.originalObject;
            id = $scope.selectedGroup.id; 
        }
    }

    $scope.getGroups = function() {
        groupService.getGroups().then(function(response) {
                $scope.groups = response.data;
            },
            function(error) {
                swal('Error', error.error_description, 'error');
            });
    }

    
    $scope.nature = [{ id: '', name: '' }];
    $scope.getNature = function () {
        groupService.getNature().then(function (response) {
                $scope.nature = response.data;
            },
            function (error) {
                swal('Error', error.error_description, 'error');
            });
    }
    $scope.getNature();
    $scope.getGroups();

    $scope.createGroup = function(invalid) {
        if (!invalid) {
            $scope.createButton = 'Creating...';
            $scope.isProcessing = true;
            var data = {
                name: $scope.model.name,
                natureId: $scope.model.natureId,
                description: $scope.model.description,
                parentGroupId: id
            }
            groupService.createGroup(data).then(function(response) {
                    swal('Success', response.data, 'success');
                    $scope.initButton();
                    $scope.model = null;
                },
                function(error) {
                    swal('Error', error.error_description, 'error');
                    $scope.initButton();
                });
        }
    }

})

routerApp.controller('chartAccountingController', function ($scope, $uibModal, authService, toastr, $state, groupService, serviceBasePath) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.updateButton = 'Update';
        $scope.isUpdatable = false;
    }

    $scope.dataLoad = function () {
        groupService.getChartOfAccounting().then(function (response) {
            $scope.chartOfAccouting = response.data;
        });
    }

    $scope.selectedMIS = function (selected) {
        if (selected) {
            $scope.chartOAobject.MisId = selected.originalObject.id;
        }
    }

    $scope.selectedLeger = function (selected) {
        if (selected) {
            $scope.chartOAobject.ledgerId = selected.originalObject.id;
        }
    }

    $scope.selectedMISupdate = function (selected) {
        if (selected) {
            console.log(selected.originalObject);
            $scope.updateChartOfAccounting.misId = selected.originalObject.id;
            $scope.updateChartOfAccounting.misName = selected.originalObject.name;
        }
    }

    $scope.selectedLegerupdate = function (selected) {
        if (selected) {
            $scope.updateChartOfAccounting.ledgerId = selected.originalObject.id;
            $scope.updateChartOfAccounting.chartOfAccounting = selected.originalObject.name;
        }
    }

    $scope.chartOAobject = {
        MisId: '',
        ledgerId: '',
        misName: '',
        legerName: ''
    }

    $scope.updateChartOfAccounting = {
        id: 1,
        misId: '',
        ledgerId: '',
        misName: '',
        chartOfAccounting: ''
    }

    $scope.dataLoad();

    $scope.saveChartOfAccouting = function (data) {
        if (data.MisId != '' || data.ledgerId != '') {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            groupService.saveChartOfAccounting(data).then(function (response) {
                swal('Success', 'Successfully Saved Chart Of Accounting Name', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.updatedChartOfAccoutingInformation = function (data) {
        if (data.MisId != '' || data.ledgerId != '') {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            groupService.saveChartOfAccounting(data).then(function (response) {
                swal('Success', 'Successfully Updated Chart Of Accouting Name', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateChartOfAccounting = function (data) {
        $scope.updateChartOfAccounting = {};

        angular.copy(data, $scope.updateChartOfAccounting)

        $scope.isUpdatable = true;
    }

    $scope.cancelUpdate = function () {
        $scope.isUpdatable = false;
    }

})


routerApp.controller('misController', function ($scope, $uibModal, toastr, $state, groupService) {

    $scope.initButton = function () {
        $scope.createButton = 'Save';
        $scope.isProcessing = false;
        $scope.updateButton = 'Update';
        $scope.isUpdatable = false;
    }

    $scope.dataLoad = function () {
        groupService.getMISNameList().then(function (response) {
            $scope.MISNameList = response.data;
        });
    }

    $scope.dataLoad();

    $scope.saveMisName = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            groupService.saveMISName(data).then(function (response) {
                swal('Success', 'Successfully Saved MIS Name', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.updatedMIS_Information = function (data, valid) {
        if (valid) {
            $scope.updateButton = 'Updating....';
            $scope.isProcessing = true;
            groupService.saveMISName(data).then(function (response) {
                swal('Success', 'Successfully Updated MIS Name', 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.UpdateMIS = function (data) {
        $scope.updateMIS = {};
        angular.copy(data, $scope.updateMIS)

        $scope.isUpdatable = true;
    }

    $scope.cancelUpdate = function () {
        $scope.isUpdatable = false;
    }

})
