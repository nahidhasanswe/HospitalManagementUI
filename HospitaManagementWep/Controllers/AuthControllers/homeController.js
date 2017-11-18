routerApp.controller('homeController', function ($scope, $uibModal, authService, $location, rolesFactory) {

    $scope.initialize = function () {
        $scope.changeButton = 'Recover Password';
        $scope.isProcessing = false;
    }

    $scope.getAuthorization = function () {
        var auth = authService.getRoleName();
        $scope.Role = auth.Role;
        $scope.Name = auth.Name; 
    }

    $scope.logout = function() {
        authService.logOut();
        $location.path('/login');
    }

    $scope.initialize();

    $scope.ChangePasswordModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/Authentication/changePassword.html',
            controller: 'homeController',
            scope: $scope,
            backdrop: 'static',
            backdropClass: 'ModalBackdrop',
            size: 'lg'
        });
    }
    $scope.changePassword = function(invalid)
    {
        $scope.changeButton = 'Changing...';
        $scope.isProcessing = true;

        if (!invalid) {
            authService.changePassword($scope.changePass).then(function (response) {
                    swal('Success', 'Password changed successfully', 'success');
                    $scope.$dismiss();
                },
                function (error) {
                    console.log(error);
                    swal('Error', 'Sorry, we can\'t change your password!', 'error');
                    $scope.initialize();
                });
        } else {
            $scope.initialize();
        }
    }

    $scope.recoverPassword = function (invalid) {
        $scope.changeButton = 'Changing...';
        $scope.isProcessing = true;

        if (!invalid) {
            authService.recoverPassword($scope.recoverData).then(function (response) {
                    swal('Success', 'Password recovered successfully', 'success');
                    $scope.initialize();
                    $location.reload();
                },
                function (error) {
                    console.log(error);
                    swal('Error', 'Sorry, we are unable to recover your password!', 'error');
                    $scope.initialize();
                });
        } else {
            $scope.initialize();
        }
    }


});