routerApp.controller('loginController',
    [
        '$scope', '$uibModal', '$stateParams', '$location', 'authService',  '$window', function($scope,
            $uibModal,
            $stateParams,
            $location,
            authService, 
            $window) {

            $scope.buttonText = function() {
                $scope.loginButton = 'Login';
                $scope.forgotButton = 'Forgot Password';
                $scope.resetButton = 'Set Password';
                $scope.isProcessing = false;
            }

            $scope.buttonText();
            $scope.loginView = 1;

            $scope.ViewLoginModal = function() {
                $scope.forgotPass = { EmployeeId: '' };
                var modalInstance = $uibModal.open({
                    templateUrl: '/View/Authentication/LoginModal.html',
                    controller: 'loginController',
                    scope: $scope,
                    backdrop: 'static',
                    backdropClass: 'ModalBackdrop',
                    size: 'lg',
                });
            }

            $scope.viewForgot = function() {
                $scope.loginView = 2;
            }


            $scope.viewLogin = function() {
                $scope.loginView = 1;
            }

            $scope.logindb = { userName: '', password: '' };

            $scope.Login = function(invalid) {
                $scope.loginButton = 'Requesting..';
                $scope.isProcessing = true;

                var loginData = { userName: $scope.logindb.userName, password: $scope.logindb.password };

                var returnUrl = $location.search().returnTo;
                if (!invalid) {
                    authService.login(loginData).then(function(response) {
                            if (returnUrl != null) {
                                $window.location.reload();
                                $location.path(returnUrl && returnUrl || "/");
                                $location.search({});
                            } else {
                                $window.location.reload();
                                $location.path('/home');
                            }

                        },
                        function(error) {
                            console.log(error);
                            swal('Error', error.error_description, 'error');
                            console.log(error)
                            $scope.buttonText();
                        });
                } else {
                    $scope.buttonText();
                }
            }

            $scope.Forgot = function(invalid) {
                $scope.forgotButton = 'Requesting..';
                $scope.isProcessing = true;

                if (!invalid) {
                    authService.ForgotPassword($scope.forgotPass).then(function(response) {
                            swal('Success', response.data, 'success');
                            $window.location.reload();
                        },
                        function(error) {
                            swal('Error', error.data.message, 'error');
                            $scope.buttonText();
                        })
                } else {
                    $scope.buttonText();
                }
            }


            
            $scope.ViewLoginModal(); 
        }
    ]);