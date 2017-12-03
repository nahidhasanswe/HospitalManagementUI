routerApp.controller('addExpensesController', function ($scope, expenseService, toastr, $state, $uibModal, reportCreate) {

    $scope.initButton = function () {
        $scope.createButton = 'Save Expenses';
        $scope.isProcessing = false;
    }

    $scope.expense = {
        transactionDate: new Date(),
        total: 0,
        due: 0,
        paid: 0,
        vat: 0,
        hospitalExpenses: []
    }

    $scope.singleExpense = {
        description: '',
        amount: 0
    };

    $scope.addExpenses = function (data) {
        if (data.description === '' || data.amount <= 0) {
            toastr.error('Provide Required information');
        }
        else {
            $scope.expense.hospitalExpenses.push(data);
            $scope.singleExpense = {
                description: '',
                amount: 0
            };
        }
    }

    $scope.removeExpenses = function (index) {
        $scope.expense.hospitalExpenses.splice(index , 1);
    }

    $scope.getTotal = function () {
        var sum = 0;
        angular.forEach($scope.expense.hospitalExpenses, function (item) {
            sum = sum + item.amount;
        })
        return sum + $scope.expense.vat;
    }

    $scope.getDue = function () {
        var total = $scope.getTotal();
        return total - $scope.expense.paid;
    }

    $scope.SaveExpenses = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Saving....';
            $scope.isProcessing = true;
            data.total = $scope.getTotal();
            data.due = $scope.getDue();
            expenseService.saveExpenses(data).then(function (response) {
                swal('Success', 'Successfully added Expenses' + response.data, 'success');
                $state.reload();
               // reportCreate.SaveExpenses(response.data);
            }, function (error) {
                $scope.initButton();
                toastr.error('Internal Server Problem');
            })
        } else {
            toastr.error('Please provide required information');
        }
    }

});

routerApp.controller('viewExpensesController', function ($scope, expenseService, toastr, $state, reportCreate, $filter) {

    $scope.initButton = function () {
        $scope.createButton = 'Search';
        $scope.isProcessing = false;
    }

    $scope.isResult = false;

    $scope.getExpenseList = function (data, valid) {
        if (valid) {
            $scope.createButton = 'Searching....';
            $scope.isProcessing = true;
            expenseService.viewExpenses(data).then(function (response) {
                $scope.expenseList = response.data;
                makeDateFormat(data);
                $scope.isResult = true;
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

    function makeDateFormat(data) {
        var fromDate = $filter('date')(data.fromDate, 'yyyy-MM-dd');
        var toDate = $filter('date')(data.toDate, 'yyyy-MM-dd');

        $scope.urlParam = '?fromDate=' + fromDate.toString() + 'toDtae=' + toDate.toString();

        console.log($scope.urlParam);
    }

    $scope.printExpenses = function () {
        reportCreate.ViewExpenses($scope.urlParam);
    }
});