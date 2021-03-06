﻿routerApp.controller('opdPatientAppointmentController', function ($scope, $location, opdService, toastr, serviceBasePath, $state) {

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

    function getSpecialist() {
        opdService.getSpecialists().then(function (response) {
            $scope.Specialists = response.data;
        }, function (error) {
            toastr.error(error.data.message);
        })
    }

    $scope.getSelectedDoctors = function (data) {
        var id = $scope.appoinment.SpecialistName;
        if (id != undefined) {
            opdService.getSpecialistDoctor(id).then(function (result) {
                $scope.doctorList = result.data;
            }, function (error) {
                toastr.error(error.data.message);
            })
        } else {
            $scope.doctorList = [];
        }

    }

    $scope.SelectedPatient = function (selected) {
        if (selected) {
            var selectedObject = selected.originalObject;
            $scope.appoinment = {
                PatientId: selectedObject.patientNumber,
                PatientName: selectedObject.name,
                Phone: selectedObject.phone,
                IsCanceled: false,
                DoctorId: '',
                DoctorName: '',
                AppointmentTime: '',
                AppointmentDate: new Date(),
                Age: '',
                Sex: ''
            };
        }
    }

    $scope.initButton();

    $scope.initialObject = function () {
        $scope.appoinment = {
            PatientId: '',
            PatientName: '',
            Phone: '',
            IsCanceled: false,
            DoctorId: '',
            DoctorName : '',
            AppointmentTime: '',
            AppointmentDate: new Date(),
            Age: '',
            Sex: '',
        }

        getSpecialist();
        //getSpecialistDoctors();
    }

    $scope.saveAppointment = function (data, valid) {
        if (valid) {
            $scope.createButton = 'submitting ....';
            $scope.isProcessing = true;
            opdService.saveAppointment(data).then(function (response) {
                swal('Successful', response.data, 'success');
                $state.reload();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            });
        } else {
            toastr.error('Please provide all required information');
        }
    }
});

routerApp.controller('opdPathologyController', function ($scope, $location, opdService, toastr, serviceBasePath, $state, reportCreate) {

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

    $scope.initialObject = function () {
        $scope.pathologyRequisition = {
            TransactionDate: new Date(),
            Total: 0,
            patientId: '',
            PatientName: '',
            Phone: '',
            Sex: '',
            Age: '',
            Discount: 0,
            Vat: 0,
            Due: 0,
            Paid: 0,
            DiagnosisTestSales: []
        };

        $scope.pathology = {
            TestId: '',
            Name: '',
            price: 0,
            quantity: 0
        };

        $scope.phone = '';
    }

    $scope.initialObject();

    $scope.SelectedPatient = function (selectedItem) {
        var item = selectedItem.originalObject;
        $scope.pathologyRequisition.patientId = item.id;
        $scope.pathologyRequisition.PatientName = item.name;
        $scope.pathologyRequisition.Phone = item.phone;
        $scope.pathologyRequisition.Sex = item.sex;
        $scope.pathologyRequisition.Age = item.age;
    }

    $scope.selectedPathology = function (selectedData) {
        var data = selectedData.originalObject;
        $scope.pathology.TestId = data.id;
        $scope.pathology.Name = data.name;
        $scope.pathology.price = data.rate;
        $scope.pathology.quantity = 1;
    }

    $scope.addPathology = function (data, valid) {
        if (getValidate()) {
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

        function getValidate() {
            if ($scope.pathology.Name === '' || $scope.pathology.price === 0 || $scope.pathology.quantity === 0)
                return false;
            else
                return true;
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


    $scope.addPathologyRequisition = function (data, valid) {
        if (!valid) {
            toastr.error('Provide proper information');
        } else {
            $scope.createButton = 'Submitting....';
            $scope.isProcessing = true;
            data.Total = $scope.getTotal();
            data.Due = $scope.getDue();

            opdService.savePathologyTestSale(data).then(function (response) {
                swal('Successful', 'Successfully added !!', 'success');
                $state.reload();
                reportCreate.OpdPathologyTestReport(response.data);
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initButton();
            });
        }
    }
});

routerApp.controller('opdTestReportDeliveryController', function ($scope, $state, opdService, toastr, serviceBasePath, reportService) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initButton = function () {
        $scope.searchButton = 'Search';
        $scope.deliveryButton = 'Delivery Report';
        $scope.isProcessing = false;
    }

    $scope.isResult = false;


    $scope.initButton();

    $scope.searchReportDelivery = function (data, valid) {
        if (valid) {
            $scope.isProcessing = true;
            $scope.searchButton = 'Searching...';
            opdService.getReportDetails(data).then(function (response) {
                $scope.testReport = response.data;
                $scope.isResult = true;
                $scope.initButton();
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initButton();
            })
        } else {
            toastr.error('Please provice invoice number then press search button');
        }
    }

    $scope.deliveryReport = function (data) {
            $scope.isProcessing = true;
            $scope.deliveryButton = 'Delivery...';
            var obj = {
                Id: data,
                IsReportDelivered: true
            };

            opdService.reportDelivery(obj).then(function (response) {
                toastr.success('Successfully delivery repoort status updated');
                $state.reload();
            }, function (error) {
                toastr.error(error.data.message);
                console.log(error);
                $scope.initButton();
            })
    }

    $scope.reportView = function () {
        reportService.viewReport(12);
    }
});

routerApp.controller('opdAppointmentController', function ($scope, $state, opdService, ipdService, toastr, serviceBasePath, reportCreate) {

    $scope.serverBasePath = serviceBasePath;

    $scope.initButton = function () {
        $scope.createButton = 'Submit';
        $scope.isProcessing = false;
    }

    $scope.isResult = false;

    $scope.initialValue = function() {
        $scope.searchAppointment = {
            AppointmentDate : new Date(),
            DoctorId : ''
        };
    }

    $scope.initialValue();

    function getDoctorList() {
        ipdService.getDoctorsListForReference().then(function (response) {
            $scope.doctorList = response.data;
        }, function (error) {
            toastr.error('Internal Server Problem');
        })
    }

    getDoctorList();

    $scope.afterSelectedDoctor = function (selected) {
        $scope.searchAppointment.DoctorId = selected.originalObject.id;
    }

    $scope.getAppointmentList = function (data, valid) {
        if (valid) {
            $scope.isProcessing = true;
            opdService.getAppointmentList(data).then(function (response) {
                $scope.initButton();
                $scope.appointmentList = response.data;
                $scope.isResult = true;
                $scope.appoinmentData = data;
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            });
        } else {
            toastr.info('Please provide all required information');
        }
    }

    $scope.generateReport = function (data) {
        reportCreate.AppointmentList(data.DoctorId, data.AppointmentDate);
    }
});

routerApp.controller('opdPaymentReceiveController', function ($scope, $state, opdService, toastr, serviceBasePath, reportCreate) { 

    $scope.initButton = function () {
        $scope.searchButton = 'Search';
        $scope.paymentButton = 'Receive Payment';
        $scope.isProcessing = false;
    }

    $scope.isResult = false;


    $scope.initButton();

    $scope.searchReportDelivery = function (data, valid) {
        if (valid) {
            $scope.isProcessing = true;
            $scope.searchButton = 'Searching...';
            opdService.getReportDetails(data).then(function (response) {
                $scope.testReport = response.data;
                $scope.isResult = true;
                $scope.initButton();
            }, function (error) {
                toastr.error('No Result Found');
                $scope.initButton();
            })
        } else {
            toastr.error('Please provice invoice number then press search button');
        }
    }

    $scope.payment = {
        TransactionDate: new Date(),
        amount: 0
    }

    $scope.paymentReceive = function (data, valid) {
        if (valid) {
            $scope.isProcessing = true;
            data.InvoiceId = $scope.testReport.invoiceId;
            data.InvoiceNumber = $scope.testReport.invoiceNumber;
            data.PatientId = $scope.testReport.patientId;

            opdService.paymentReceive(data).then(function (response) {
                $state.reload();
                reportCreate.OpdPaymentReceive(response.data);
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data.message);
            })
        } else {
            $scope.initButton();
            toastr.error('Provice valid information');
        }
    }

    generateReport = function (data) {
        reportCreate.AppointmentList(data);
    }
});