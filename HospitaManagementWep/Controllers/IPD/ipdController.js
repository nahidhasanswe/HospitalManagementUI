routerApp.controller('ipdController', function ($scope, $location, ipdService, distributorService, toastr, serviceBasePath){  

    $scope.serverBasePath = serviceBasePath;

    $scope.initButton = function () {
        $scope.createButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.ExistPatientText = 'Exist Patient';
    $scope.isExist = false;

    $scope.ExistPatient = function () {
        $scope.isExist = !$scope.isExist;
        if ($scope.isExist)
            $scope.ExistPatientText = 'Hide';
        else
            $scope.ExistPatientText = 'Exist Patient';
    }

    function getDoctorList () {
        ipdService.getDoctorsListForReference().then(function(response){
            $scope.doctorList = response.data;
        }, function(error){
            toastr.error('Internal Server Problem');
        })
    }

    function getAgentList () {
        ipdService.getAgentListForReference().then(function(response){
            $scope.agentList = response.data;
        }, function(error){
            toastr.error('Internal Server Problem');
        })
    }

    $scope.SelectedPatient = function (selected) {
        if (selected) {
            var selectedObject = selected.originalObject;
            $scope.admission = {
                id: selectedObject.id,
                name: selectedObject.name,
                fatherName: selectedObject.fatherName,
                villOrHouseAddress: selectedObject.villOrHouseAddress,
                postOffice: selectedObject.postOffice,
                postCode: selectedObject.postCode,
                PoliceStation: selectedObject.policeStation,
                District: selectedObject.district,
                Phone: selectedObject.phone,
                AdmissionFee: 0,
                ReferencedBy: '',
                Agent: '',
                ContractAmount: 0,
                transactionDate: new Date(),
                Purpose: '',
                Paid: 0,
                Vat: 0,
                total: 0,
                due: 0,
                discount: 0
            }
        }
    }

    $scope.initButton();

    $scope.initialObject = function() {
        $scope.admission = {
            id: '',
            name :'',
            fatherName :'',
            villOrHouseAddress :'',
            postOffice : '',
            postCode : '',
            PoliceStation :'',
            District :'',
            Phone :'',
            Email :'',
            AdmissionFee :0,
            ReferencedBy :'',
            Agent :'',
            ContractAmount :0,
            transactionDate : new Date(),
            Purpose :'',
            Paid : 0 ,
            Vat :0,
            total :0,
            due : 0,
            discount :0
        }

        getDoctorList();
        getAgentList();
    }

    $scope.getTotal = function() {
       return $scope.admission.AdmissionFee + $scope.admission.ContractAmount + $scope.admission.Vat - $scope.admission.discount;
    }

    $scope.getDue = function() {
        return $scope.getTotal() - $scope.admission.Paid;
    }

    $scope.afterSelectedDoctor = function (selected) {
        $scope.admission.ReferencedBy = selected.originalObject.id;
    }

    $scope.afterSelectedAgent = function (selected) {
        $scope.admission.Agent = selected.originalObject.id;
    }

    $scope.admitIpdPatient = function(data, valid) {
        if(valid) {
            $scope.createButton = 'submitting ....';
            $scope.isProcessing = true;
            data.total = $scope.getTotal();
            data.due = $scope.getDue();
            ipdService.admitPatient(data).then(function(response) {
                swal('Successful',response.data,'success');
                $scope.initButton();
                $scope.initialObject();
            }, function(error) {
                $scope.initButton();
                toastr.error(error.data);
            });
        }else {
            toastr.info('Please provide all required information');
        }
    }
});

routerApp.controller('ipdPatientListController', function ($scope, $location,ipdService, distributorService, toastr){  
    
    $scope.initButton = function () {
        $scope.createButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.getPatientList = function () {
        ipdService.getIPDPatientList().then(function(response){
            $scope.patientList = response.data;
        }, function(error){
            toastr.error('Internal Server Problem');
        }) 
    }    
});

routerApp.controller('patientDischargeController', function ($scope, $location, ipdService, distributorService, toastr) {

    $scope.initial = function () {
        $scope.searchButton = 'Search';
        $scope.isSearch = false;
        $scope.dischargeButton = 'Discharge';
        $scope.isDischarge = false;

        $scope.dischargePatient = {};
    }

    $scope.patient = null;



    $scope.searchaPatient = function (id, valid) {
        if (valid) {
            $scope.searchButton = 'Searching ...';
            $scope.isSearch = true;
            ipdService.getPatientById(id).then(function (response) {
                $scope.initial();
                $scope.patient = response.data;
                $scope.dischargePatient.DischargeDate = new Date();
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
                $scope.patient = null;
            })
        } else {
            toastr.error("Provide Patient Id Number");
        }
    }

    $scope.patientDischarge = function (data, valid) {
        if (valid && $scope.patient != null) {
            $scope.dischargeButton = 'Discharging...';
            $scope.isDischarge = true;
            data.PatientId = $scope.patient.patientId;
            data.IsDischarged = true;

            ipdService.dischargePatient(data).then(function (response) {
                $scope.initial();
                swal('Successfull', 'Successfully discharged the patient', 'success');
                $scope.patient = null;
                $scope.searchId = '';
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
            })
        } else {
            toastr.error("Provide Discharge Date");
        }
    }

});

routerApp.controller('medicienRequisitionController', function ($scope, $location, $state , ipdService, distributorService, toastr, medicineDataService, serviceBasePath) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initialObject = function () {
        $scope.medicineRequisition = {
            TransactionDate: new Date(),
            Total: 0,
            patientId: '',
            AdmissionId: '',
            Discount: 0,
            Vat: 0,
            Due: 0,
            Paid: 0,
            MedicineSales: []
        };

        $scope.medicine = {
            medicineId: '',
            soldDate: new Date(),
            price: 0,
            quantity: 0
        };

        $scope.phone = '';
    }

    $scope.initialObject();

    $scope.SelectedPatient = function (selectedItem) {
        var item = selectedItem.originalObject;
        $scope.medicineRequisition.patientId = item.id;
        $scope.medicineRequisition.AdmissionId = item.admissionId;
        $scope.phone = item.phone;
    }


    $scope.initial = function () {
        $scope.submitButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.selectedMedicine = function (selectedData) {
        var data = selectedData.originalObject;
        $scope.medicine.medicineId = data.id;
        $scope.medicine.medicineName = data.name;
        $scope.medicine.soldDate = new Date();
        $scope.medicine.price = data.salingPrice;
        $scope.medicine.quantity = 1;
    }

    $scope.addMedicine = function (data, valid) {
        if (valid) {
            $scope.medicineRequisition.MedicineSales.push(data);
            $scope.medicine = {
                medicineId: '',
                soldDate: new Date(),
                price: 0,
                quantity: 0
            };
        } else {
            toastr.error('Please provide proper information');
        }
    }

    $scope.removeMedicine = function (index) {
        $scope.medicineRequisition.MedicineSales.splice(index, 1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.medicineRequisition.MedicineSales, function (item) {
            sum = sum + (item.price * item.quantity);
        })
        return sum + $scope.medicineRequisition.Vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.medicineRequisition.Discount - $scope.medicineRequisition.Paid;
    }


    $scope.addMedicineRequisition = function (data) {
        if (data.patientId == '' && data.PatientAdmId == '') {
            toastr.error('Provide proper information');
        } else {
            $scope.submitButton = 'Submitting....';
            $scope.isProcessing = true;
            data.Total = $scope.getTotal();
            data.Due = $scope.getDue();
            ipdService.addMedicineRequisition(data).then(function (response) {
                swal('Successful', 'Successfully added !!', 'success');
                $state.reload();
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
            });
        }
    }

    

});

routerApp.controller('pathologyRequisitionController', function ($scope, $location, $state, ipdService, distributorService, toastr, medicineDataService, serviceBasePath) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initialObject = function () {
        $scope.pathologyRequisition = {
            TransactionDate: new Date(),
            Total: 0,
            patientId: '',
            AdmissionId: '',
            Discount: 0,
            Vat: 0,
            Due: 0,
            Paid: 0,
            DiagnosisTestSales: []
        };

        $scope.pathology = {
            TestId: '',
            Name:'',
            price: 0,
            quantity: 0
        };

        $scope.phone = '';
    }

    $scope.initialObject();

    $scope.SelectedPatient = function (selectedItem) {
        var item = selectedItem.originalObject;
        $scope.pathologyRequisition.patientId = item.id;
        $scope.pathologyRequisition.AdmissionId = item.admissionId;
        $scope.phone = item.phone;
    }


    $scope.initial = function () {
        $scope.submitButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.selectedPathology = function (selectedData) {
        var data = selectedData.originalObject;
        $scope.pathology.TestId = data.id;
        $scope.pathology.Name = data.name;
        $scope.pathology.price = data.rate;
        $scope.pathology.quantity = 1;
    }

    $scope.addPathology= function (data, valid) {
        if (valid) {
            $scope.pathologyRequisition.DiagnosisTestSales.push(data);
            $scope.pathology = {
                TestId: '',
                Name: '',
                price: 0,
                quantity: 0
            };
        } else {
            toastr.error('Please provide proper information');
        }
    }

    $scope.removePathology = function (index) {
        $scope.pathologyRequisition.DiagnosisTestSales.splice(index, 1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.pathologyRequisition.DiagnosisTestSales, function (item) {
            sum = sum + (item.price * item.quantity);
        })
        return sum + $scope.pathologyRequisition.Vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.pathologyRequisition.Discount - $scope.pathologyRequisition.Paid;
    }


    $scope.addPathologyRequisition = function (data) {
        if (data.patientId == '' && data.PatientAdmId == '') {
            toastr.error('Provide proper information');
        } else {
            $scope.submitButton = 'Submitting....';
            $scope.isProcessing = true;
            ipdService.addPathologyRequisition(data).then(function (response) {
                swal('Successful', 'Successfully added !!', 'success');
                $state.reload();
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
            });
        }
    }
});

routerApp.controller('healthEquipmentRequisitionController', function ($scope, $location, $state, ipdService, distributorService, toastr, medicineDataService, serviceBasePath) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initialObject = function () {
        $scope.equipmentRequisition = {
            TransactionDate: new Date(),
            Total: 0,
            patientId: '',
            admissionId: '',
            Discount: 0,
            Vat: 0,
            Due: 0,
            Paid: 0,
            HospitalityEquipmentSales: []
        };

        $scope.equipment = {
            EquipmentId: '',
            name: '',
            Rate: 0,
            quantity: 0,
            MeasurementUnit:''
        };

        $scope.phone = '';

        ipdService.getMeasurementUnit().then(function (response) {
            $scope.measurementUnitList = response.data;
        })
    }

    $scope.initialObject();

    $scope.SelectedPatient = function (selectedItem) {
        var item = selectedItem.originalObject;
        $scope.equipmentRequisition.patientId = item.id;
        $scope.equipmentRequisition.admissionId = item.admissionId;
        $scope.phone = item.phone;
    }


    $scope.initial = function () {
        $scope.submitButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.selectedEquipment = function (selectedData) {
        var data = selectedData.originalObject;
        $scope.equipment.EquipmentId = data.id;
        $scope.equipment.name = data.name;
        $scope.equipment.Rate = data.saleRate;
        $scope.equipment.Quantity = 1;
    }

    $scope.addEquipment = function (data, valid) {
        if (valid) {
            $scope.equipmentRequisition.HospitalityEquipmentSales.push(data);
            $scope.equipment = {
                EquipmentId: '',
                name: '',
                Rate: 0,
                quantity: 0,
                MeasurementUnit: ''
            };
        } else {
            toastr.error('Please provide proper information');
        }
    }

    $scope.removeEquipment = function (index) {
        $scope.equipmentRequisition.HospitalityEquipmentSales.splice(index, 1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.equipmentRequisition.HospitalityEquipmentSales, function (item) {
            sum = sum + (item.Rate * item.Quantity);
        })
        return sum + $scope.equipmentRequisition.Vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.equipmentRequisition.Discount - $scope.equipmentRequisition.Paid;
    }

    $scope.addEquipmentRequisition = function (data) {
        if (data.patientId == '' && data.PatientAdmId == '') {
            toastr.error('Provide proper information');
        } else {
            $scope.submitButton = 'Submitting....';
            $scope.isProcessing = true;
            ipdService.addEquipmentRequisition(data).then(function (response) {
                swal('Successful', 'Successfully added !!', 'success');
                $state.reload();
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initial();
            });
        }
    }

});

routerApp.controller('ipdDischargePatientListController', function ($scope, $location, ipdService, distributorService, toastr) {

    $scope.initButton = function () {
        $scope.createButton = 'Search';
        $scope.isProcessing = false;
    }

    $scope.getPatientList = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Searching....';
            $scope.isProcessing = true;
            ipdService.getDischargePatientList(data).then(function (response) {
                $scope.patientList = response.data;
                $scope.initButton();
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

    $scope.searchDate = {
        fromDate: new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)),
        toDate: new Date()
    };

});