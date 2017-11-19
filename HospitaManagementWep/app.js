var routerApp = angular.module('routerApp', ['ui.router', 'smart-table', 'AuthApp', 'ui.bootstrap', 'ui.bootstrap.modal', 'ngMessages', 'chieffancypants.loadingBar', 'ngAnimate', 'ngTouch', 'angucomplete-alt', 'toastr', 'datatables','angucomplete']);

routerApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home',
            {
                url: '/home',
                templateUrl: '/views/partial-home.html',
                controller: 'homeController',
                authorize: false
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
                controller: 'homeController'
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
                controller: 'roleController'
            })
        .state('createRole',
            {
                url: '/create-role',
                templateUrl: '/views/role/createRole.html',
                controller: 'roleController'
            })
        .state('users',
            {
                url: '/users',
                controller: 'userController',
                templateUrl: '/views/Authentication/users.html'
            })
        /* authentication routing end */
        /* pharmacy routing start */
        .state('medicineComapny',
            {
                url: '/medicine-company',
                controller: 'distributorController',
                templateUrl: '/views/pharmacy/company.html'
        })
        .state('salesMedicine',
        {
            url: '/sales-medicine',
            controller: 'posController',
            templateUrl: '/views/pharmacy/salesMedicine.html'
        })
        .state('medicineSupplier',
            {
                url: '/medicine-supplier',
                controller: 'distributorController',
                templateUrl: '/views/pharmacy/supplier.html'
        })
        .state('medicine',
            {
                url: '/medicine',
                controller: 'medicineController',
                templateUrl: '/views/pharmacy/medicine.html'
        })
        .state('medicineType',
            {
                url: '/medicine-type',
                controller: 'medicineController',
                templateUrl:'/views/pharmacy/medicineType.html'
        })
        .state('medicineGroup',
            {
                url: '/medicine-group',
                controller: 'medicineController',
                templateUrl: '/views/pharmacy/medicineGroup.html'
            })
        .state('medicineStore',
            {
                url: '/medicine-store',
                controller: 'posController',
                templateUrl:'/views/pharmacy/medicineStorage.html'
        })
        .state('soldMedicine',
            {
                url: '/sold-medicine',
                controller: 'posController',
                templateUrl: '/views/pharmacy/soldMedicine.html'
        })
        .state('purchasedMedicine',
            {
                url: '/purchased-medicine',
                controller: 'posController',
                templateUrl: '/views/pharmacy/purchasedMedicine.html'
        })
        .state('purchaseMedicine',
            {
                url: '/purchase-medicine',
                controller: 'posController',
                templateUrl: '/views/pharmacy/purchaseMedicine.html'
            })
        /* pharmacy routing end */

        // IPD routing
        .state('ipdPatientAdmission',
            {
                url: '/ipd-patient-admission',
                controller: 'ipdController',
                templateUrl: './views/IPD/AddIpdPatient.html'
            })
        .state('ipdPatientList',
            {
                url: '/ipd-patient-list',
                controller: 'ipdPatientListController',
                templateUrl: './views/IPD/PatientList.html'
            })
        .state('patientDischarge',
            {
                url: '/patient-discharge',
                controller: 'patientDischargeController',
                templateUrl: './views/IPD/PatientDischarge.html'
            })
       .state('ipdMedicineRequision',
            {
                url: '/ipd-medicine-requisition',
                controller: 'medicienRequisitionController',
                templateUrl: './views/IPD/medicineRequisition.html'
            })
        .state('ipdPathologyRequisition',
            {
                url: '/ipd-pathology-requisition',
                controller: 'pathologyRequisitionController',
                templateUrl: './views/IPD/IpdPathologyRequisition.html'
            })
        .state('ipdEquipmentRequisition',
            {
                url: '/ipd-health-equipment-requisition',
                controller: 'healthEquipmentRequisitionController',
                templateUrl: './views/IPD/IpdEquipmentRequisition.html'
            })
        .state('ipdDischargePatientList',
            {
                url: '/ipd-discharge-patient-list',
                controller: 'ipdDischargePatientListController',
                templateUrl: './views/IPD/DischargePatientList.html'
            })


        /* Administrator Management Setting Routing */
        .state('doctorList',
            {
                url: '/doctor-management',
                controller: 'doctorsMngController',
                templateUrl: './views/Administrator/AddDoctor.html'
            })
        .state('specialist',
            {
                url: '/specialist-management',
                controller: 'specialistMngController',
                templateUrl: './views/Administrator/AddSpecialistName.html'
            })

        /* Pathology Management Routing */
        .state('pathologyManagement',
            {
                url: '/pathology-list',
                controller: 'pathologyController',
                templateUrl: './views/Pathology/Add_List_Pathology.html'
            })
        .state('purchaseIngradiant',
            {
                url: '/purchase-ingradiant',
                controller: 'purchaseIngradiantController',
                templateUrl: './views/Pathology/PurchaseIngradiant.html'
            })

        /* Expenses Routing */
        .state('addExpenses',
            {
                url: '/add-expenses',
                controller: 'addExpensesController',
                templateUrl: './views/Expenses/AddExpenses.html'
            })
        .state('viewExpenses',
            {
                url: '/view-expenses',
                controller: 'viewExpensesController',
                templateUrl: './views/Expenses/ViewReportExpenses.html'
            })

        /* OPD Routing */
        .state('opdPatientAppointment',
            {
                url: '/opd-patient-appointment',
                controller: 'opdPatientAppointmentController',
                templateUrl: './views/OPD/PatientAppointment.html'
            })
        .state('opdPathologyTest',
            {
                url: '/opd-pathology-test',
                controller: 'opdPathologyController',
                templateUrl: './views/OPD/opdPathologyTest.html'
            })
        .state('opdReportDelivery',
            {
                url: '/opd-report-delivery',
                controller: 'opdTestReportDeliveryController',
                templateUrl: './views/OPD/opdReportDelivery.html'
            })
        .state('opdAppointmentDetails',
            {
                url: '/opd-appointment-list',
                controller: 'opdAppointmentController',
                templateUrl: './views/OPD/opdAppointmentList.html'
            })

        /* accounting routing open */
        .state('createGroup',
            {
                url: '/create-group',
                controller: 'groupController',
                templateUrl: '/views/accounting/createGroup.html'
            })
        .state('createLedger',
            {
                url: '/create-ledger',
                controller: 'ledgerController',
                templateUrl: '/views/accounting/createLedger.html'
            })
        .state('journalVoucher',
            {
                url: '/journal-voucher',
                controller: 'voucherController',
                templateUrl: '/views/accounting/createJournalVoucher.html'
            })
        .state('paymentVoucher',
            {
                url: '/payment-voucher',
                controller: 'voucherController',
                templateUrl: '/views/accounting/createPaymentVoucher.html'
            })
        .state('receiveVoucher',
            {
                url: '/receive-voucher',
                controller: 'voucherController',
                templateUrl: '/views/accounting/createReceiveVoucher.html'
            })
        .state('trialBalance',
            {
                url: '/trial-balance',
                controller: 'voucherController'
            })
        .state('balanceSheet',
            {
                url: '/balance-sheet',
                controller: 'voucherController'
            })
        .state('ledgrBook',
            {
                url: '/ledger-book',
                controller: 'ledgerController'
            })
        .state('incomeStatement',
            {
                url: '/income-statement',
                controller: 'voucherController'
            })
        .state('paymentReceiveStatement',
            {
                url: '/payment-receive-statement',
                controller: 'voucherController'
            });
        /* accounting routing end */

    $locationProvider.hashPrefix('');
});


/* Inject the AuthInterceptor Services */
routerApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});





routerApp.run(function ($rootScope, $location, authService) {

    function getPath(route) {
        if (!!route && typeof (route.originalPath) === "string")
            return "'" + route.originalPath + "'";
        return "[unknown route, using otherwise]";
    }
    $rootScope.$on("$stateChangeStart", function (evt, to, from) {
        if (to.authorize === true) {
            to.resolve = to.resolve || {};
            if (!to.resolve.authorizationResolver) {
                to.resolve.authorizationResolver = function (authService) {
                    return authService.getAuthInfo();

                };
            }
        }

    });

    $rootScope.$on("$stateChangeError", function (evt, to, from, error) {
        $location.path("/login").search("returnTo", to.originalPath);
    });

    // NOT needed in authorization / logging purposes only
    $rootScope.$on("$stateChangeSuccess", function (evt, to, from) {

    }); 
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

