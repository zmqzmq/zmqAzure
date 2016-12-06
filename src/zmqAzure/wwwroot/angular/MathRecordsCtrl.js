app.controller('MathRecordsCtrl', function ($scope, $http, $attrs) {

    getRecordsFromDB();

    function getRecordsFromDB() {
        url = "/api/MathRecords/";
        if ($attrs.usermail) {
            url = "/api/MathRecords/" + $attrs.usermail;
        }


        $http.get(url).then(function (d) {
            $scope.mathRecords = d.data;
        }, function (error) {
            //$log.error('Oops! Something went wrong while fetching the data.')
        });
    }

});