
routerApp.controller('userController', function ($scope, $filter, userFactory) {
    $scope.displayedCollection = [];

    $scope.getName = function () {
        userFactory.users().then(function (response) {
            $scope.rowCollection = response.data;
            $scope.displayedCollection = response.data;

        }, function (error) {
            console.log(error.errr_description);
            swal('Error', error.data.message, 'error');
        });
    }
    $scope.getName();

    $scope.editUser = function (id) {
        swal('Information', id, 'info');
    }

    $scope.users = [{ id:1, name: 'masud' }, {id:2, name: 'tultul' }];
    $scope.selecteduser = null;

    $scope.afterSelectedUser = function (selected) {
        if (selected) {
            $scope.selecteduser = selected.originalObject;
        }
    }

    $scope.deleteUser = function (id) {
        userFactory.removeUser(id).then(function (response) {
            $scope.rowCollection = response.data;
            $scope.displayedCollection = response.data;
            swal('Success', 'User is successfully removed!', 'success');
        }, function (error) {
            swal('Error', 'Sorry, we can\'t remove this user', 'error');
        });
    }


});