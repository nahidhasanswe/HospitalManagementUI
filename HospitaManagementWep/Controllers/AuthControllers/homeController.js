routerApp.controller('homeController', function ($scope, $uibModal, authService, $location) {

    $scope.Name = 'tultul';

    $scope.getAuthorization = function () {
        var auth = authService.getRoleName();
        $scope.Role = auth.Role;
        $scope.Name = auth.Name;
        console.log($scope.Name);
    }

    $scope.logout = function() {
        authService.logOut();
        $location.path('/login');
    }

});