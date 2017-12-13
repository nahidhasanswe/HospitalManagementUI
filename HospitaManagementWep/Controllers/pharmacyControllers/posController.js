routerApp.controller('posController', function ($scope, $location, medicineDataService, posDataService, posService, distributorService, toastr, reportCreate, $state) {

    $scope.initButton = function () {
        $scope.createButton = 'Submit';
        $scope.isProcessing = false;
    }
    $scope.initButton();

    $scope.price = 0;
    $scope.quantity = 0;

    $scope.medicineStore = {}

    $scope.getMedicineStorage = function() {
        posDataService.getMedicineStorage().then(function(response) {
                $scope.medicineStore = response.data;
            },
            function(error) {
                swal('Error', error.data.message, 'error');
            });
    }

    $scope.getSoldMedicine = function (invalid) {
        if (!invalid) {
            posDataService.getSoldMedicine($scope.range).then(function (response) {
                $scope.medicineStore = response.data;
                },
                function (error) {
                    swal('Error', error.data.message, 'error');
                });
        }
       
    }

    $scope.getPurchasedMedicine = function () {
        posDataService.getPurchasedMedicine($scope.range).then(function (response) {
                $scope.medicineStore = response.data;
            },
            function (error) {
                swal('Error', error.data, 'error');
            });
    }

    $scope.today  = function(){ 
        $scope.transactionDate = new Date(); 
    } 

    //Autocomplete for supplier info start
    $scope.supplier = {}

    $scope.getSupplier = function() {
        distributorService.getSupplier().then(function(response) {
            $scope.supplier = response.data; 
        },function(error) {
            toastr.error(error.data);
        });
    } 

    $scope.selectedSupplier = {}

    $scope.afterSelectedSupplier = function (selected) {
        if (selected) {
            $scope.selectedSupplier = selected.originalObject;
            $scope.supplierId = $scope.selectedSupplier.id; 
            $scope.phone = $scope.selectedSupplier.phone; 
        }
    }

    $scope.getCustomerList = function () {
        posService.getCustomerList().then(function (response) {
            $scope.PatientList = response.data;
            console.log(response.data);
        })
    }

    $scope.getCustomerList();

    $scope.getSupplier();
    //Autocomplete for supplier info end

    //AutoComplete for medicine info start
    $scope.medicines = {}

    $scope.getMedicineIdAndName = function () {
        medicineDataService.getMedicineIdAndName().then(function (response) {
            $scope.medicines = response.data;
        }, function (error) {
            toastr.error(error.data); 
        });
    }

    $scope.selectedMedicine = {}

    $scope.medicineId = '';

    $scope.afterSelectedMedicine = function (selected) {
        if (selected) {
            $scope.selectedMedicine = selected.originalObject;
            $scope.medicineId = $scope.selectedMedicine.id;  
        }
    }

    $scope.getMedicineIdAndName();
    //AutoComplete for medicine info end

    //Purcahse/Sale Medicine from supplier start
    $scope.model = {
        transactionDate: $scope.transactionDate,
        total: $scope.total,
        discount: $scope.discount,
        vat: $scope.vat,
        due: $scope.due,
        SupplierId: $scope.supplierId,
        MedicinePurchases: []
    }
   
    $scope.due = 0;
    $scope.discount = 0;
    $scope.paid = 0;
    $scope.vat = 0;
    $scope.total = 0;
    var totals = 0;
    var dues = 0;
    $scope.add = function() {
        if ($scope.medicineId !== '' && $scope.quantity > 0 && $scope.price > 0) {
            $scope.purchase = {
                medicineId: $scope.medicineId,
                quantity: $scope.quantity,
                price: $scope.price,
                medicineName: $scope.selectedMedicine.name
            }
            $scope.model.MedicinePurchases.push($scope.purchase);
            $scope.total += $scope.price * $scope.quantity;
            totals = $scope.total;
            dues = $scope.total;
            $scope.purchase = {};
            $scope.selectedMedicine = {}
            $scope.quantity = 0;
            $scope.price = 0;
        }
    }

    $scope.delete = function (data) {
        totals -= data.quantity * data.price;
        $scope.total = totals;
        dues = totals;
        var index = $scope.model.MedicinePurchases.indexOf(data);
        $scope.model.MedicinePurchases.splice(index,1);
    }

    $scope.addVat = function() {
        $scope.total = totals + $scope.vat - $scope.discount;
        dues = $scope.total;
    }

    $scope.makeDue = function() {
        $scope.due = dues - $scope.paid;
    }

    $scope.insertPurchase = function () { 
        if ($scope.supplierId === undefined) {
            swal('warning', 'Please enter supplier info','warning');
            return false;
        }
        if ($scope.model.MedicinePurchases.length <= 0) {
            swal('Warning', 'Please insert medicine to purchase', 'warning');
            return false;
        };

        $scope.model.transactionDate = $scope.transactionDate;
        $scope.model.SupplierId = $scope.supplierId;
        $scope.model.total= $scope.total,
        $scope.model.discount = $scope.discount,
        $scope.model.vat = $scope.vat;
        $scope.model.due = $scope.due;
        posService.purchaseMedicine($scope.model).then(function(response) {
            toastr.success('successfully Medicine Purchase');
            reportCreate.BuyMedicine(respose.data)
            },
            function(err) {
                toastr.error(err.data.message);
            });
        clarePurchaseField();
        
    }

    function clarePurchaseField() {
        $scope.model = {};
        $scope.due = 0;
        $scope.discount = 0;
        $scope.total = 0;
        $scope.vat = 0;
        $scope.paid = 0;
    }


    //Purcahse/Sale Medicine from supplier start
    $scope.salesMedicine = {
        transactionDate: new Date(),
        customerName: '',
        patientId: '',
        MedicineSales: []
    };

    $scope.medicineDetails = {
        medicineName: '',
        medicineId : '',
        price: 0,
        quantity: 0
    };

    $scope.addMedicineDetails = function (data, valid) {
        if (valid) {
            var tempdata = {};
            angular.copy(data, tempdata);
            $scope.salesMedicine.MedicineSales.push(tempdata);
            setReset();
        } else {
            toastr.error('Please add Medicine information');
        }
    }

    $scope.removeMedicineDetails = function (index) {
        $scope.salesMedicine.MedicineSales.splice(index,1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.salesMedicine.MedicineSales, function (item) {
            sum = sum + (item.price * item.quantity);
        })
        return sum + $scope.vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.discount - $scope.paid;
    }

    $scope.afterSelectedMedicineforSales = function (selected) {
        if (selected) {
            $scope.selectedMedicine = selected.originalObject;
            $scope.medicineDetails.medicineId = $scope.selectedMedicine.id;
            $scope.medicineDetails.medicineName = $scope.selectedMedicine.name;
            $scope.medicineDetails.price = $scope.selectedMedicine.salingPrice;
        }
    }

    $scope.afterSelectedCustomer = function (selected) {
        $scope.salesMedicine.patientId = selected.originalObject.id;
        $scope.salesMedicine.customerName = selected.originalObject.name;
    }

    function setReset() {
        $scope.medicineDetails = {
            medicineName: '',
            medicineId: '',
            price: 0,
            quantity: 0
        };

    }

    $scope.saveSaleMedicine = function () {

        $scope.createButton = 'Submitting.....';
        $scope.isProcessing = true;

        $scope.salesMedicine.vat = $scope.vat;
        $scope.salesMedicine.transactionDate = $scope.transactionDate;
        $scope.salesMedicine.discount = $scope.discount;
        $scope.salesMedicine.paid = $scope.paid;
        $scope.salesMedicine.total = $scope.getTotal();
        $scope.salesMedicine.due = $scope.getDue();

        posService.saleMedicine($scope.salesMedicine).then(function (response) {
            $scope.initButton();
            toastr.success('Successfull');
            $state.reload();
            reportCreate.SaleMedicine(response.data);
        }, function (error) {
            $scope.initButton();
            toastr.error(error.data);
        })
    }


});