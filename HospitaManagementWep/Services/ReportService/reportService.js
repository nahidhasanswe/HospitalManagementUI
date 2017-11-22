routerApp.factory('reportService', function (serviceBasePath) {
    var report = {};

    report.viewReport = function (id) {
        // var completeUrl = serviceBasePath + 'report/document/' + id;
        var completeUrl = 'http://www.africau.edu/images/default/sample.pdf';
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
                'href': completeUrl
            }
        );
    }

    return report;
});