routerApp.controller('changeController', function ($scope, $uibModal) {


    $scope.ChangePassword = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/changePassword.html',
            controller: 'homeController',
            scope: $scope,
            backdrop: 'static',
            backdropClass: 'ModalBackdrop',
            size: 'lg'
        });
    }
    $scope.ChangePassword();
});