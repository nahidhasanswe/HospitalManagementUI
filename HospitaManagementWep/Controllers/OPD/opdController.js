routerApp.controller('opdPatientAppointmentController', function ($scope, $location, opdService, toastr, serviceBasePath,$state) {

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
            toastr.error('Internal Server Problem');
        })
    }

    $scope.getSelectedDoctors = function () {
        var id = $scope.appoinment.SpecialistName;
        opdService.getSpecialistDoctor(id).then(function (result) {
            $scope.doctorList = result.data;
        }, function (error) {
            toastr.error('Internal Server Problem');
        })

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
                toastr.error(error.data);
            });
        } else {
            toastr.error('Please provide all required information');
        }
    }
});

routerApp.controller('opdPathologyController', function ($scope, $location, opdService, toastr, serviceBasePath, $state) {

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
            }, function (error) {
                toastr.error(error.data.message);
                $scope.initButton();
            });
        }
    }
});

routerApp.controller('opdTestReportDeliveryController', function ($scope, $location, opdService, toastr, serviceBasePath) {

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

    function getDoctorList() {
        ipdService.getDoctorsListForReference().then(function (response) {
            $scope.doctorList = response.data;
        }, function (error) {
            toastr.error('Internal Server Problem');
        })
    }

    function getAgentList() {
        ipdService.getAgentListForReference().then(function (response) {
            $scope.agentList = response.data;
        }, function (error) {
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

    $scope.initialObject = function () {
        $scope.admission = {
            id: '',
            name: '',
            fatherName: '',
            villOrHouseAddress: '',
            postOffice: '',
            postCode: '',
            PoliceStation: '',
            District: '',
            Phone: '',
            Email: '',
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

        getDoctorList();
        getAgentList();
    }

    $scope.getTotal = function () {
        return $scope.admission.AdmissionFee + $scope.admission.ContractAmount + $scope.admission.Vat - $scope.admission.discount;
    }

    $scope.getDue = function () {
        return $scope.getTotal() - $scope.admission.Paid;
    }

    $scope.afterSelectedDoctor = function (selected) {
        $scope.admission.ReferencedBy = selected.originalObject.id;
    }

    $scope.afterSelectedAgent = function (selected) {
        $scope.admission.Agent = selected.originalObject.id;
    }

    $scope.admitIpdPatient = function (data, valid) {
        if (valid) {
            $scope.createButton = 'submitting ....';
            $scope.isProcessing = true;
            data.total = $scope.getTotal();
            data.due = $scope.getDue();
            ipdService.admitPatient(data).then(function (response) {
                swal('Successful', response.data, 'success');
                $scope.initButton();
                $scope.initialObject();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data);
            });
        } else {
            toastr.info('Please provide all required information');
        }
    }
});

routerApp.controller('opdAppointmentController', function ($scope, $location, opdService, toastr, serviceBasePath) {

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

    function getDoctorList() {
        ipdService.getDoctorsListForReference().then(function (response) {
            $scope.doctorList = response.data;
        }, function (error) {
            toastr.error('Internal Server Problem');
        })
    }

    function getAgentList() {
        ipdService.getAgentListForReference().then(function (response) {
            $scope.agentList = response.data;
        }, function (error) {
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

    $scope.initialObject = function () {
        $scope.admission = {
            id: '',
            name: '',
            fatherName: '',
            villOrHouseAddress: '',
            postOffice: '',
            postCode: '',
            PoliceStation: '',
            District: '',
            Phone: '',
            Email: '',
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

        getDoctorList();
        getAgentList();
    }

    $scope.getTotal = function () {
        return $scope.admission.AdmissionFee + $scope.admission.ContractAmount + $scope.admission.Vat - $scope.admission.discount;
    }

    $scope.getDue = function () {
        return $scope.getTotal() - $scope.admission.Paid;
    }

    $scope.afterSelectedDoctor = function (selected) {
        $scope.admission.ReferencedBy = selected.originalObject.id;
    }

    $scope.afterSelectedAgent = function (selected) {
        $scope.admission.Agent = selected.originalObject.id;
    }

    $scope.admitIpdPatient = function (data, valid) {
        if (valid) {
            $scope.createButton = 'submitting ....';
            $scope.isProcessing = true;
            data.total = $scope.getTotal();
            data.due = $scope.getDue();
            ipdService.admitPatient(data).then(function (response) {
                swal('Successful', response.data, 'success');
                $scope.initButton();
                $scope.initialObject();
            }, function (error) {
                $scope.initButton();
                toastr.error(error.data);
            });
        } else {
            toastr.info('Please provide all required information');
        }
    }
});