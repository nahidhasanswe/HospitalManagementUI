routerApp.controller('registerController', function ($scope, $uibModal,  $stateParams, $location, authService, $window) {

    $scope.buttonText = function () {
        $scope.registerButton = 'Register';
        $scope.removeButton = 'Remove User';
        $scope.isProcessing = false;
    }

    $scope.buttonText();

    function clearRegisterField() {
            $scope.regData.firstName = '',
            $scope.regData.lastName = '',
            $scope.regData.email = '',
            $scope.regData.userName = '',
            $scope.regData.password = '',
            $scope.regData.confPassword = ''
    }

    $scope.register = function (invalid) {

        $scope.registerData = {
            firstName: $scope.regData.firstName,
            lastName: $scope.regData.lastName,
            email: $scope.regData.email,
            userName: $scope.regData.userName,
            password: $scope.regData.password,
            confirmPassword: $scope.regData.confPassword,
            roleName: 'user'
        };
        if (!invalid) {

            $scope.isProcessing = true;
            $scope.registerButton = 'Registering...';

            authService.saveRegistration($scope.registerData).then(function (response) {
                swal('Success', 'User registration successful', 'success');
                clearRegisterField();
                $scope.buttonText();
            }, function (error) {
                swal('Error', 'We are unable to register your because of internal problem', 'error');
                $scope.buttonText();
            });
        }
    }

    $scope.deleteUser = function(invalid) {
        var user = $scope.userName;
    }

});