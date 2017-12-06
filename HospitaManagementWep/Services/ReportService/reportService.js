routerApp.factory('reportService', function (serviceBasePath) {
    var report = {};

    report.viewReport = function (url) {
        // var completeUrl = serviceBasePath + 'report/document/' + id;
        var completeUrl = 'http://hms.a2zmanagementsystem.com/api/ipd/ipd-pos/documents/123';
        $.fancybox.open(
            {
                'title': 'Report Window',
                'type': 'iframe',
                //fitToView: false,
                //width: '90%',
                //height: '90%',
                //autoSize: false,
                'transitionIn': 'elastic',
                'transitionOut': 'elastic',
                'speedIn': 1000,
                'speedOut': 700,
                autoSize: true,
                closeClick: false,
                'href': url,
                helpers: {
                    overlay: {
                        closeClick: false
                    } // prevents closing when clicking OUTSIDE fancybox
                }
            }
        );
    }

    return report;
});

routerApp.factory('reportCreate', function (serviceBasePath, reportService, $filter) {
    var report = {};

    report.AppointmentList = function (doctorId, date) {
        //var appoinmentDate = $filter('date')(date, 'yyyy-MM-dd');
        var appoinmentDate = moment(date).format('YYYY-MM-DD');
        var url = serviceBasePath + '/api/report/patient-report/appoint?date=' + appoinmentDate + '&doctorId=' + doctorId;
        reportService.viewReport(url);
    }

    report.OpdPathologyTestReport = function (invoiceId) {
        var url = serviceBasePath + '/api/report/pos-report/diagnosis-test-sale/' + invoiceId;
        reportService.viewReport(url);
    }

    report.OpdPaymentReceive = function (invoiceId) {
        var url = serviceBasePath + '/api/report/pos-report/diagnosis-test-sale/' + invoiceId;
        reportService.viewReport(url);
    }

    report.IpdPatientAdmission = function (invoiceId) {
        var url = serviceBasePath + '' + invoiceId;
        reportService.viewReport(url);
    }

    report.IpdPathologyRequisition = function (invoiceId) {
        var url = serviceBasePath + '/api/report/pos-report/diagnosis-test-requisition/' + invoiceId;
        reportService.viewReport(url);
    }

    report.IpdMedicineRequisition = function (invoiceId) {
        var url = serviceBasePath + '/api/report/pos-report/medicine-requisition/' + invoiceId;
        reportService.viewReport(url);
    }

    report.IpdEquipmentRequision = function (invoiceId) {
        var url = serviceBasePath + '/api/report/pos-report/health-equipment-requisition/' + invoiceId;
        reportService.viewReport(url);
    }

    report.IpdPatientDischarge = function (invoiceId) {
        var url = serviceBasePath + '' + invoiceId;
        reportService.viewReport(url);
    }

    report.SaleMedicine = function (invoiceId) {
        var url = serviceBasePath + '/api/report/pos-report/medicine-sale/' + invoiceId;
        reportService.viewReport(url);
    }

    report.BuyMedicine = function (invoiceId) {
        var url = serviceBasePath + '' + invoiceId;
        reportService.viewReport(url);
    }

    report.SaveExpenses = function (invoiceId) {
        var url = serviceBasePath + '/api/expense/expense-data/view-expens/' + invoiceId;
        reportService.viewReport(url);
    }

    report.ViewExpenses = function (urlParam) {
        var url = serviceBasePath + '/api/report/expense-report/expense-by-date-range' + urlParam;
        reportService.viewReport(url);
    }

    report.purchaseIngradiant = function (invoiceId) {
        var url = serviceBasePath + '' + invoiceId;
        reportService.viewReport(url);
    }

    report.ChartOfAccounting = function (invoiceId) {
        var url = serviceBasePath + '' + invoiceId;
        reportService.viewReport(url);
    }

    return report;
});