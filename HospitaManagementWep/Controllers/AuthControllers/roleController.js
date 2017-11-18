routerApp.controller('roleController', function ($scope, $uibModal, $filter, authService, $location, rolesFactory) {

    $scope.buttonInit = function () {
        $scope.roleButton = 'Create Role';
        $scope.isProcessing = false;
    }

    $scope.buttonInit();

    $scope.getRoles = function () {
        rolesFactory.getAllRoleName().then(function (response) {
            $scope.vas = response.data;
        },
            function (error) {
                swal('Error', error.error_description, 'error');
            });
    }

    $scope.editRole = function (id) {
        swal(id);
    }

    $scope.deleteRole = function (id) {
        var items = $scope.vas;
        var onlyMatching = items.filter(function (item) { return item.id == id; });
        console.log(onlyMatching[0].name);
        swal({
            title: 'Are you sure?',
            text: 'Your will not be able to recover the role: ' + onlyMatching[0].name,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false
        },
            function () {
                rolesFactory.deleteRole(id).then(function (response) {

                    $scope.vas = response.data;

                    swal('Success', 'The role is successfully deleted', 'success');
                },
                    function (error) {
                        swal('Error', 'We can not delete this role form database', 'error');
                    });
            });
    }

    $scope.createRole = function(invalid) {
        if (!invalid) {
            $scope.roleButton = 'Creating...';
            $scope.isProcessing = true;
            var role = {
                name: $scope.roleName
        }
            rolesFactory.createRole(role).then(function(response) {
                $scope.vas = response.data;
                swal('Success', 'Role is created successfully');
                $scope.buttonInit();
                $scope.roleName = '';
            }, function (error) {
                swal('Oops!', 'We are unable to create the role: '+role, 'error');
                $scope.buttonInit();
            });
        }
    }


});