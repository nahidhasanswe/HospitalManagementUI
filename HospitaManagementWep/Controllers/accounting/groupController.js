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