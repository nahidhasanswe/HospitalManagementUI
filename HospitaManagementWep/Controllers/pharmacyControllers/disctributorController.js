routerApp.controller('distributorController', function ($scope, serviceBasePath,  $location, distributorService, toastr) {
    $scope.initButton = function () {
        $scope.createButton = 'Submit';
        $scope.isProcessing = false;
    }
    $scope.initButton();

    $scope.company = {};
    $scope.supplier = {};

    $scope.getMedicineCompany = function () {
        distributorService.getCompany().then(function (response) {
            $scope.medicineCompany = response.data;  
            },
            function (error) {
                toastr.error(error.data, 'Failed');
            });
    }
    
    $scope.editCompany = function (company) {
        $scope.company = company;
    }

    $scope.saveMedicineCompany = function (invalid) {
        if (!invalid) {
            $scope.createButton = 'Submiting...';
            $scope.isProcessing = true;
            distributorService.saveCompany($scope.company).then(function (response) {
                toastr.success(response.data, 'Success!');
                $scope.getMedicineCompany();
                $scope.initButton();
                $scope.company = {id: '', name:''};
            },
                function (error) {
                    toastr.error(error.data.message, 'Faild!');
                    $scope.initButton();
                });
        }
    }

 
    $scope.getMedicineSupplier = function() {
        distributorService.getSupplier().then(function (response) {
                $scope.medicineSupplier = response.data; 
            },
            function (error) {
                toastr.error(error.data.message, 'Failed');
            });
    }

    $scope.editSupplier = function(supplier) {
        $scope.supplier = supplier;
    }

    $scope.saveMedicineSupplier = function(invalid) {
        if (!invalid) {
            $scope.createButton = 'Submiting...';
            $scope.isProcessing = true;
            distributorService.saveSupplier($scope.supplier).then(function (response) {
                    toastr.success(response.data, 'Success!');
                    $scope.getMedicineSupplier();
                    $scope.initButton();
                    $scope.company = { id: '', name: '' };
                },
                function (error) {
                    toastr.error(error.data.message, 'Faild!');
                    $scope.initButton();
                });
        }
    }
     
});