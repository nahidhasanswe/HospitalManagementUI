routerApp.factory('expenseService', function ($http, serviceBasePath) {
    var expenses = {};

    expenses.saveExpenses = function (expenseData) {
        return $http.post(serviceBasePath + '/api/expense/expense/save', expenseData);
    }

    expenses.viewExpenses = function (DateRange) {
        return $http.post(serviceBasePath + '/api/expense/expense-data/view-expense-by-date', DateRange);
    }

    return expenses;
});