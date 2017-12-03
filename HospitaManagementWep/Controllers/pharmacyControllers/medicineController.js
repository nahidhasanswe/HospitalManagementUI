routerApp.controller('medicineController', function ($scope, authService, $location, medicineDataService, medicineService, distributorService, toastr) {

    $scope.initButton = function () {
        $scope.createButton = 'Submit';
        $scope.isProcessing = false;
    }
    $scope.initButton();

    $scope.supplierList = {}
    $scope.companyList = {}
    $scope.medicineGroup = {}
    $scope.medicineList = {}
    $scope.medicine = {}
    $scope.allMedicineType = {}

    $scope.GetAllMedicine = function () {
        medicineDataService.GetAllMedicine().then(function (response) {
            $scope.medicineList = response.data; 
            },
            function (error) {
                toastr.error(error.data, 'Failed to Load');
            });
    }

    $scope.getAllMedicineType = function () {
        medicineDataService.GetAllMedicineType().then(function (response) {
            $scope.allMedicineType = response.data; 
        },
            function (error) {
                swal('Error', error.data, 'error');
            });
    }

    $scope.editType = function (type) {
        $scope.medicineType = type;
    }

    $scope.saveMedicineType = function (invalid) {
        if (!invalid) {
            $scope.createButton = 'Submiting...';
            $scope.isProcessing = true;
            medicineService.saveMedicineType($scope.medicineType).then(function (response) {
                toastr.success(response.data, 'Saved!');
                $scope.getAllMedicineType();
                $scope.initButton();
            },
                function (error) {
                    toastr.error(error.data, 'Failed!');
                    $scope.initButton();
                });
            $scope.initButton();
        }
    }

   
    $scope.getMedicineCompany = function() {
        distributorService.getCompanyNameAndId().then(function(response) {
                $scope.companyList = response.data;
            },
            function(error) {
                swal('Error', error.data, 'error');
            });
    }

    $scope.selectedCompany = null;

    $scope.afterSelectedCompany = function (selected) {
        if (selected) {
            $scope.selectedCompany = selected.originalObject;
            console.log($scope.selectedCompany);
        }
    }

    $scope.getMedicineGroupWithNameAndId = function() {
        medicineDataService.getMedicineGroupIdAndName().then(function(response) {
                $scope.medicineGroup = response.data;
            },
            function(error) {
                swal('Error', error.data, 'error');
            });
    }

    $scope.selectedGroup = null;

    $scope.afterSelectedGroup = function (selected) {
        if (selected) {
            $scope.selectedGroup = selected.originalObject;
            console.log($scope.selectedGroup);
        }
    }

    $scope.saveMedicine = function(invalid) {
        if (!invalid) {
            $scope.createButton = 'Submiting...';
            $scope.isProcessing = true;

            var data = {
                name: $scope.medicine.name,
                groupId: $scope.selectedGroup.id,
                companyId: $scope.selectedCompany.id,
                medicineTypeId: $scope.medicine.medicineTypeId,
                initialBalance: $scope.medicine.initialBalance,
                salingPrice: $scope.medicine.salingPrice,
                purchasePrice: $scope.medicine.purchasePrice
            }
            medicineService.saveMedicine(data).then(function(response) {
                    toastr.success(response.data, 'Saved!');
                },
                function(error) {
                    toastr.error(error.data, 'Failed!');
                });
        }
    }

    $scope.getAllMedicineGroup = function() {
        medicineDataService.getAllMedicineGroup().then(function(response) {
            $scope.medicineGroup = response.data;
                console.log($scope.medicineGroup);
            },
            function(error) {
                swal('Error', error.data, 'error');
            });
    }

    $scope.group = null;

    $scope.editGroup = function(group) {
        $scope.group = group;
    }

    $scope.saveMedicineGroup = function (invalid) {
        if (!invalid) {
            $scope.createButton = 'Submiting...';
            $scope.isProcessing = true;
            medicineService.saveMedicineGroup($scope.group).then(function (response) {
                    toastr.success(response.data, 'Saved!');
                    $scope.getAllMedicineGroup();
                    $scope.initButton();
                    $scope.group = null;
                },
                function (error) {
                    toastr.error(error.data, 'Failed!');
                    $scope.initButton();
                });
            $scope.initButton();
        }
    }
});


routerApp.controller('medicinePaymentController', function ($scope, $state, medicinePaymentService, toastr, serviceBasePath, reportCreate) {

    $scope.initButton = function () {
        $scope.searchButton = 'Search';
        $scope.paymentButton = 'Payment';
        $scope.isProcessing = false;
    }

    $scope.serverBasePath = serviceBasePath;

    $scope.isResult = false;

    $scope.initButton();

    $scope.SelectedPatient = function (selectedPatient) {
        var info = selectedPatient.originalObject;
        $scope.searchDate.patientId = info.id;

        $scope.isResult = false;

        $scope.patientInfo = {
            name: info.name,
            fatherName: info.fatherName,
            phone: info.phone
        }

        $scope.patientPaymentInfo.patientId = info.id;


    }

    $scope.patientPaymentInfo = {
        TransactionDate: new Date(),
        patientId: '',
        Total: 0,
        Discount: 0,
        Vat: 0,
        Due: 0,
        Paid: 0
    }

    $scope.searchDate = {
        fromDate: new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)),
        toDate: new Date(),
        patientId: ''
    };


    $scope.searchResult = function (patientInfo) {
        $scope.searchButton = 'Searching...';
        $scope.isProcessing = true;
        medicinePaymentService.getPatientData(patientInfo).then(function (response) {
            $scope.paymentInfo = response.data;
            $scope.isResult = true;
            $scope.initButton();
        }, function (error) {
            toastr.error(error.data.message);
            $scope.initButton();
        })
    }

    $scope.medicineDuePayment = function (paymentData, valid) {
        if (valid) {
            $scope.paymentButton = 'Paymenting...';
            $scope.isProcessing = true;
            medicinePaymentService.dueMedicinePayment(paymentData).then(function (response) {
                swal('Successful', 'Successfully Payment', 'success');
                $state.reload();
                reportCreate.IpdEquipmentRequision(response.data);
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initButton();
            })
        } else {
            toastr.error('Provide Proper Information');
        }
    }
   
});