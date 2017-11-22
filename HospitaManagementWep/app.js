var routerApp = angular.module('routerApp', ['ui.router', 'smart-table', 'AuthApp', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngMessages', 'chieffancypants.loadingBar', 'ngAnimate', 'ngTouch', 'angucomplete-alt', 'toastr', 'datatables', 'angucomplete']);

routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home',
            {
                url: '/home',
                templateUrl: '/views/partial-home.html',
                controller: 'homeController',
                resolve: { authenticate: authenticate }
            })
        .state('home.list',
            {
                url: '/list',
                templateUrl: '/views/partial-home-list.html',
                controller: 'homeListController'
            })
        .state('home.paragraph',
            {
                url: '/paragraph',
                template: '<h2>This is paragraph</h2>'
            })
        .state('about',
            {
                url: '/about',
                views: {
                    '': { templateUrl: '/views/partial-about.html' },
                    'columnOne@about': { template: 'Look I am column one' },
                    'columnTwo@about': {
                        templateUrl: 'views/table-data.html',
                        controller: 'peopleController'
                    }
                }
            })
        /* authentication routing opent*/
        .state('login',
            {
                url: '/login',
                templateUrl: '/views/Authentication/SimplePage.html',
                controller: 'loginController'
            })
        .state('create',
            {
                url: '/create-user',
                templateUrl: '/views/home/create.html',
                controller: 'registerController'
            })
        .state('changePassword',
            {
                url: '/change-password',
                templateUrl: '/views/Authentication/changeSimple.html',
                controller: 'homeController',
                resolve: { authenticate: authenticate }
            })
        .state('recoverPassword',
            {
                url: '/recover-password',
                templateUrl: '/views/Authentication/RecoverPassword.html',
                controller: 'homeController'
            })
        .state('roles',
            {
                url: '/user-roles',
                templateUrl: '/views/role/roles.html',
                controller: 'roleController',
                resolve: { authenticate: authenticate }
            })
        .state('createRole',
            {
                url: '/create-role',
                templateUrl: '/views/role/createRole.html',
                controller: 'roleController',
                resolve: { authenticate: authenticate }
            })
        .state('users',
            {
                url: '/users',
                controller: 'userController',
                templateUrl: '/views/Authentication/users.html',
                resolve: { authenticate: authenticate }
            })
        /* authentication routing end */
        /* pharmacy routing start */
        .state('medicineComapny',
            {
                url: '/medicine-company',
                controller: 'distributorController',
                templateUrl: '/views/pharmacy/company.html',
                resolve: { authenticate: authenticate }
        })
        .state('salesMedicine',
        {
            url: '/sales-medicine',
            controller: 'posController',
            templateUrl: '/views/pharmacy/salesMedicine.html',
            resolve: { authenticate: authenticate }
        })
        .state('medicineSupplier',
            {
                url: '/medicine-supplier',
                controller: 'distributorController',
                templateUrl: '/views/pharmacy/supplier.html',
                resolve: { authenticate: authenticate }
        })
        .state('medicine',
            {
                url: '/medicine',
                controller: 'medicineController',
                templateUrl: '/views/pharmacy/medicine.html',
                resolve: { authenticate: authenticate }
        })
        .state('medicineType',
            {
                url: '/medicine-type',
                controller: 'medicineController',
                templateUrl: '/views/pharmacy/medicineType.html',
                resolve: { authenticate: authenticate }
        })
        .state('medicineGroup',
            {
                url: '/medicine-group',
                controller: 'medicineController',
                templateUrl: '/views/pharmacy/medicineGroup.html',
                resolve: { authenticate: authenticate }
            })
        .state('medicineStore',
            {
                url: '/medicine-store',
                controller: 'posController',
                templateUrl: '/views/pharmacy/medicineStorage.html',
                resolve: { authenticate: authenticate }
        })
        .state('soldMedicine',
            {
                url: '/sold-medicine',
                controller: 'posController',
                templateUrl: '/views/pharmacy/soldMedicine.html',
                resolve: { authenticate: authenticate }
        })
        .state('purchasedMedicine',
            {
                url: '/purchased-medicine',
                controller: 'posController',
                templateUrl: '/views/pharmacy/purchasedMedicine.html',
                resolve: { authenticate: authenticate }
        })
        .state('purchaseMedicine',
            {
                url: '/purchase-medicine',
                controller: 'posController',
                templateUrl: '/views/pharmacy/purchaseMedicine.html',
                resolve: { authenticate: authenticate }
            })
        /* pharmacy routing end */

        // IPD routing
        .state('ipdPatientAdmission',
            {
                url: '/ipd-patient-admission',
                controller: 'ipdController',
                templateUrl: './views/IPD/AddIpdPatient.html',
                resolve: { authenticate: authenticate }
            })
        .state('ipdPatientList',
            {
                url: '/ipd-patient-list',
                controller: 'ipdPatientListController',
                templateUrl: './views/IPD/PatientList.html',
                resolve: { authenticate: authenticate }
            })
        .state('patientDischarge',
            {
                url: '/patient-discharge',
                controller: 'patientDischargeController',
                templateUrl: './views/IPD/PatientDischarge.html',
                resolve: { authenticate: authenticate }
            })
       .state('ipdMedicineRequision',
            {
                url: '/ipd-medicine-requisition',
                controller: 'medicienRequisitionController',
                templateUrl: './views/IPD/medicineRequisition.html',
                resolve: { authenticate: authenticate }
            })
        .state('ipdPathologyRequisition',
            {
                url: '/ipd-pathology-requisition',
                controller: 'pathologyRequisitionController',
                templateUrl: './views/IPD/IpdPathologyRequisition.html',
                resolve: { authenticate: authenticate }
            })
        .state('ipdEquipmentRequisition',
            {
                url: '/ipd-health-equipment-requisition',
                controller: 'healthEquipmentRequisitionController',
                templateUrl: './views/IPD/IpdEquipmentRequisition.html',
                resolve: { authenticate: authenticate }
            })
        .state('ipdDischargePatientList',
            {
                url: '/ipd-discharge-patient-list',
                controller: 'ipdDischargePatientListController',
                templateUrl: './views/IPD/DischargePatientList.html',
                resolve: { authenticate: authenticate }
            })


        /* Administrator Management Setting Routing */
        .state('doctorList',
            {
                url: '/doctor-management',
                controller: 'doctorsMngController',
                templateUrl: './views/Administrator/AddDoctor.html',
                resolve: { authenticate: authenticate }
            })
        .state('specialist',
            {
                url: '/specialist-management',
                controller: 'specialistMngController',
                templateUrl: './views/Administrator/AddSpecialistName.html',
                resolve: { authenticate: authenticate }
            })

        /* Pathology Management Routing */
        .state('pathologyManagement',
            {
                url: '/pathology-list',
                controller: 'pathologyController',
                templateUrl: './views/Pathology/Add_List_Pathology.html',
                resolve: { authenticate: authenticate }
            })
        .state('purchaseIngradiant',
            {
                url: '/purchase-ingradiant',
                controller: 'purchaseIngradiantController',
                templateUrl: './views/Pathology/PurchaseIngradiant.html',
                resolve: { authenticate: authenticate }
            })

        /* Expenses Routing */
        .state('addExpenses',
            {
                url: '/add-expenses',
                controller: 'addExpensesController',
                templateUrl: './views/Expenses/AddExpenses.html',
                resolve: { authenticate: authenticate }
            })
        .state('viewExpenses',
            {
                url: '/view-expenses',
                controller: 'viewExpensesController',
                templateUrl: './views/Expenses/ViewReportExpenses.html',
                resolve: { authenticate: authenticate }
            })

        /* OPD Routing */
        .state('opdPatientAppointment',
            {
                url: '/opd-patient-appointment',
                controller: 'opdPatientAppointmentController',
                templateUrl: './views/OPD/PatientAppointment.html',
                resolve: { authenticate: authenticate }
            })
        .state('opdPathologyTest',
            {
                url: '/opd-pathology-test',
                controller: 'opdPathologyController',
                templateUrl: './views/OPD/opdPathologyTest.html',
                resolve: { authenticate: authenticate }
            })
        .state('opdReportDelivery',
            {
                url: '/opd-report-delivery',
                controller: 'opdTestReportDeliveryController',
                templateUrl: './views/OPD/opdReportDelivery.html',
                resolve: { authenticate: authenticate }
            })
        .state('opdAppointmentDetails',
            {
                url: '/opd-appointment-list',
                controller: 'opdAppointmentController',
                templateUrl: './views/OPD/opdAppointmentList.html',
                resolve: { authenticate: authenticate }
            })

        /* accounting routing open */
        .state('createGroup',
            {
                url: '/create-group',
                controller: 'groupController',
                templateUrl: '/views/accounting/createGroup.html',
                resolve: { authenticate: authenticate }
            })
        .state('createLedger',
            {
                url: '/create-ledger',
                controller: 'ledgerController',
                templateUrl: '/views/accounting/createLedger.html',
                resolve: { authenticate: authenticate }
            })
        .state('journalVoucher',
            {
                url: '/journal-voucher',
                controller: 'voucherController',
                templateUrl: '/views/accounting/createJournalVoucher.html',
                resolve: { authenticate: authenticate }
            })
        .state('paymentVoucher',
            {
                url: '/payment-voucher',
                controller: 'voucherController',
                templateUrl: '/views/accounting/createPaymentVoucher.html',
                resolve: { authenticate: authenticate }
            })
        .state('receiveVoucher',
            {
                url: '/receive-voucher',
                controller: 'voucherController',
                templateUrl: '/views/accounting/createReceiveVoucher.html',
                resolve: { authenticate: authenticate }
            })
        .state('trialBalance',
            {
                url: '/trial-balance',
                controller: 'voucherController',
                resolve: { authenticate: authenticate }
            })
        .state('balanceSheet',
            {
                url: '/balance-sheet',
                controller: 'voucherController',
                resolve: { authenticate: authenticate }
            })
        .state('ledgrBook',
            {
                url: '/ledger-book',
                controller: 'ledgerController',
                resolve: { authenticate: authenticate }
            })
        .state('incomeStatement',
            {
                url: '/income-statement',
                controller: 'voucherController',
                resolve: { authenticate: authenticate }
            })
        .state('paymentReceiveStatement',
            {
                url: '/payment-receive-statement',
                controller: 'voucherController',
                resolve: { authenticate: authenticate }
            });
        /* accounting routing end */


    function authenticate($q, authService, $state, $timeout, $location) {

        if (authService.getAuthInfo()) {
                // Resolve the promise successfully
                return $q.when()
            } else {
                // The next bit of code is asynchronously tricky.

            $timeout(function () {
                var currentRoute = $location.path();
                    // This code runs after the authentication promise has been rejected.
                    // Go to the log-in page
                    
                    //$state.go('login', { return: 'Nahid' });
                    $location.path("/login").search("returnTo", currentRoute);
                })

                // Reject the authentication promise to prevent the state from loading
                return $q.reject()
            }
        }

    $locationProvider.hashPrefix('');
});


/* Inject the AuthInterceptor Services */
routerApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});


routerApp.config(function (cfpLoadingBarProvider, toastrConfig) {
    cfpLoadingBarProvider.includeSpinner = true;
    toastrConfig.progressBar = true;
    toastrConfig.timeout = '1000';
});


/* Global Constant Domain Name for API */
//'http://hms.a2zmanagementsystem.com'
routerApp.constant('serviceBasePath','https://masud.azurewebsites.net');

//routerApp.run(function ($rootScope, $localtion) {
//    $rootScope.location = $localtion;
//});

routerApp.controller('homeListController', function ($scope, toastr) {
    toastr.success('Hello world!', 'Toastr fun!');
    $scope.fruits = ['Apple', 'banana', 'Mango', 'Orange'];
});

routerApp.controller('peopleController', function ($scope) {
    $scope.men = [
        { name: 'Masud', age: 28 },
        { name: 'Rasel', age: 26 },
        { name: 'Mehedee', age: 23 },
        { name: 'Tultul', age: 21 }
    ];
});

