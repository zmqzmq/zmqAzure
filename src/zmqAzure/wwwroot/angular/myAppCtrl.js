app.controller('myAppCtrl', function ($scope, $interval, $http, $filter, NumService, QuesAnsService, $attrs) {
    $scope.UserMail = $attrs.usermail;
    $scope.SessionStart = "";
	$scope.numMin = 0; $scope.numMax=100000;
    $scope.numAMin = 0;
    $scope.numAMax = 100;
    $scope.numBMin = 0;
    $scope.numBMax = 100;
    $scope.numAMinMD = 1;
    $scope.numAMaxMD = 10;
    $scope.numBMinMD = 1;
    $scope.numBMaxMD = 10;

    $scope.patterns = [{ name: 'PLUS', checked: true },
			{ name: 'MINUS', checked: true },
			{ name: 'MULTIPLY', checked: true },
			{ name: 'DIVIDE', checked: true },
			{ name: 'FRACTION', checked: true},
  	        { name: 'FRACTION1', checked: true}];

    
    $scope.nextButtonText = "Start";
    $scope.quesString = "Welcome";	

    $scope.ans = -1;
    $scope.ansTextBoxInput = "";
    $scope.ansCorrect = true;

    $scope.timerCounterMax=60;
    $scope.timerCounter =0;

    $scope.pattern = "";

    $scope.records=[];
	
	$scope.numADenominator = 0;
	$scope.numANumerator = 0;
	$scope.numBDenominator = 0;
	$scope.numBNumerator = 0;
	$scope.factor = 0;

	$scope.numGenerate = 100;
	$scope.quesStringBatch = [];
/*	
	$scope.locationInfo={};
	$http.get('http://ipinfo.io/json').success(function(data){

			$scope.locationInfo=data;
			alert("locationInfo:"+$scope.locationInfo.ip+"\n"+$scope.locationInfo.country+"\n"+$scope.locationInfo.city+"\n"+$scope.locationInfo.hostname);
		});
*/
		
 
 
    function choosePattern() {
        if ($scope.patternsChecked.length == 1) {
            $scope.pattern = $scope.patternsChecked[0];
        }
        else {
            var idx = NumService.getANum(0,$scope.patternsChecked.length-1); 
            $scope.pattern = $scope.patternsChecked[idx];
        }
    }

    function setQAString()
	{
		if ($scope.pattern != "")
		{
			var temp;
            if ($scope.pattern == "FRACTION")
			{
				temp = QuesAnsService.getQuesAnsF($scope.numAMinMD,$scope.numAMaxMD,$scope.numBMinMD,$scope.numBMaxMD);
				$scope.quesString = temp[0];				
                $scope.ans = temp[1];
				$scope.numANumerator = temp[2];
				$scope.numADenominator = temp[3];
				$scope.numBNumerator = temp[4];
				$scope.numBDenominator = temp[5];				
				$scope.factor = "";						
			}
			else if ($scope.pattern == "FRACTION1")
			{
				temp = QuesAnsService.getQuesAnsF1($scope.numAMinMD,$scope.numAMaxMD);
                $scope.quesString = temp[0];				
                $scope.ans = temp[1];				
				$scope.numANumerator = temp[2];
				$scope.numADenominator = temp[3];
				$scope.numBNumerator = temp[4];
				$scope.numBDenominator = temp[5];				
				$scope.factor = temp[6];									
			}
			else
			{
				temp = QuesAnsService.getQuesAns($scope.pattern,$scope.numAMin,$scope.numAMax,$scope.numBMin,$scope.numBMax,$scope.numAMinMD,$scope.numAMaxMD,$scope.numBMinMD,$scope.numBMaxMD);
                $scope.quesString = temp[0];				
                $scope.ans = temp[1];							
			}
			
		}
	}
	
 

    $scope.run = function () {
	if($scope.nextButtonText == "Start"){
		$scope.nextButtonText = "Next";
		$scope.setPatternsChecked();

		$scope.SessionStart = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
	}
        $scope.quesString = "";
        $scope.ansTextBoxInput = "";
        $scope.ansCorrect = false;

        if ($scope.patternsChecked.length > 0) {
            choosePattern();
            setQAString();

			timerStart();
        }
    };

	
	$scope.generateBatch=function(){
		$scope.setPatternsChecked();
		$scope.quesStringBatch = [];
		$scope.quesStringBatchStream = "";
		
        if ($scope.numGenerate>0 && $scope.patternsChecked.length > 0)
		{
			for(i = 1; i <= $scope.numGenerate; i++)
			{
				choosePattern();
				
				if ($scope.pattern != "")
				{
					var temp;
					if ($scope.pattern == "FRACTION")
					{
						temp = QuesAnsService.getQuesAnsF($scope.numAMinMD,$scope.numAMaxMD,$scope.numBMinMD,$scope.numBMaxMD);			
					}
					else if ($scope.pattern == "FRACTION1")
					{
						temp = QuesAnsService.getQuesAnsF1($scope.numAMinMD,$scope.numAMaxMD); 				
					}
					else
					{
						temp = QuesAnsService.getQuesAns($scope.pattern,$scope.numAMin,$scope.numAMax,$scope.numBMin,$scope.numBMax,$scope.numAMinMD,$scope.numAMaxMD,$scope.numBMinMD,$scope.numBMaxMD);					
					}
					$scope.quesStringBatchStream +=  i+ ". "+ temp[0] + "\r\n";
					$scope.quesStringBatch.push(i+ ". "+temp[0]);
				}							
			}
			
			var myBlob = new Blob([$scope.quesStringBatchStream],{type:'text/html'});
			$scope.blobURL = (window.URL || window.webkitURL).createObjectURL(myBlob);
		}
	};
	
    $scope.setPatternsChecked = function () {
        $scope.patternsChecked = [];
        angular.forEach($scope.patterns, function (pattern) {
            if (pattern.checked) {
                $scope.patternsChecked.push(pattern.name);
            }
        });
    };
    $scope.ansTextBoxInputChange = function(){
    	if(Number($scope.ansTextBoxInput)==$scope.ans || $scope.ans=="any")
	{
		$scope.ansCorrect=true;
		timerStop();
		addRecord(true);
	}
	else
	{
		$scope.ansCorrect=false;
	}
    };
	
var timerWork;

function timerStart()
{
	$scope.timerCounter =0;
	timerStop();
	timerWork=$interval(timerIncrement,1000);
}
function timerStop(){
	$interval.cancel(timerWork);
}
$scope.$on('$destroy',function(){
	timerStop();
});

	function timerIncrement()
	{
		$scope.timerCounter += 1;
		if($scope.timerCounter>=$scope.timerCounterMax){
			$scope.timerCounter=0;
			$scope.ansCorrect=true;
			timerStop();
			addRecord(false);
		}
	}

	function addRecord(finished)
	{
		if(finished){
			var record={id:$scope.records.length+1,quesString:$scope.quesString,timeSpend:$scope.timerCounter};
		}
		else{
			var record={id:$scope.records.length+1,quesString:$scope.quesString,timeSpend:-1};
		}

		var dbRecord = { UserMail: $scope.UserMail, SessionStart: $scope.SessionStart, quesString:record.quesString, timeSpend:record.timeSpend };
		$scope.records.push(record);
		return $http(
        {
            method: 'post',
            data: dbRecord,
            url: '/api/mathrecords',
            headers: { 'Content-Type': 'application/json' }
        });
	}

	//function getRecordsFromDB()
	//{
	//    url = "/api/MathRecords";
	//    if ($scope.UserMail != "")
	//        url = "/api/MathRecords/" + $scope.UserMail;

	//    $http.get(url).then(function (d) {
	//        $scope.mathRecords = d.data;
	//    }, function (error) {
	//        //$log.error('Oops! Something went wrong while fetching the data.')
	//    });
	//}
});
