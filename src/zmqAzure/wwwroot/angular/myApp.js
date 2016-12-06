var app = angular.module('myApp', []);

app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);



app.directive('focusMe', function ($timeout, $parse) {
    return {
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                if (value === true) {
                    $timeout(function () {                        
                        element[0].focus();
                    });
                }
            });
        }
    };
});

app.directive('scrollToBottom', function(){
    return {
        restrict: 'A',
        scope: {
            trigger: '=scrollToBottom'
        },
        link: function postLink(scope, elem) {
            scope.$watch('trigger', function() {
				elem[0].scrollTop=elem[0].scrollHeight+elem[0].offsetTop;
            });
        }
    };
});

app.service('NumService',function(){
	
	this.getANum = function(a,b){return Math.floor(Math.random() * (b - a + 1)) + Number(a);};
});

app.service('QuesAnsService',function(NumService){
	
	this.getQuesAnsF = function(numAMinMD,numAMaxMD,numBMinMD,numBMaxMD){//FRACTION
        	var numA = NumService.getANum(numAMinMD,numAMaxMD);
		var numB = NumService.getANum(numBMinMD,numBMaxMD);
	        var factor = NumService.getANum(2,10);
	        var idx = NumService.getANum(0,1);	
	        switch (idx)
		{
	            case 0:
	                ques =  numA + "/" + numB + " = ?/" + numB * factor;
	                ans = numA * factor;
	
			numBNumerator = "?";
			numBDenominator = numB * factor;
	
	                break;
	            case 1:
	                ques = numA + "/" + numB + " = " + numA * factor + "/?";
	                ans = numB * factor;

			numBNumerator = numA * factor;					
			numBDenominator = "?";

	                break;
	        }
		numANumerator = numA;
		numADenominator = numB;
		
		return [ques,ans,numANumerator,numADenominator,numBNumerator,numBDenominator];
	};

		
	this.getQuesAnsF1 = function(numAMinMD,numAMaxMD){//FRACTION1
        	var numA = NumService.getANum(numAMinMD,numAMaxMD);

		var factor = NumService.getANum(1,9);
		var remain = NumService.getANum(1,numA-1); 
		var idx = NumService.getANum(0,1);
		if(numA==1)
		{
			numA = 2;
		}	
		numB = numA * factor + remain;


		switch (idx)
		{
			case 0:
				ques =  numB + "/" + numA + " = " + factor + " + ? /" + numA;
				ans = remain;
				numBNumerator = "?";						
				break;
			case 1:
				ques =  numB + "/" + numA + " = ? + " + remain + "/" + numA;
				ans = factor;
				numBNumerator = remain;					
				factor = "? ";						
				break;
		}		
		numANumerator = numB;
		numADenominator = numA;
		numBDenominator = numA;
		return [ques,ans,numANumerator,numADenominator,numBNumerator,numBDenominator,factor];	
	};

	this.getQuesAns = function(pattern,numAMin,numAMax,numBMin,numBMax,numAMinMD,numAMaxMD,numBMinMD,numBMaxMD){//PLUS/MULTIPLY/DIVIDE/MINUS
		var operation = "";
		var numA,numB;
		switch (pattern)
		{
			case "PLUS":
				operation = " + ";
               			numA = NumService.getANum(numAMin,numAMax);	
                		numB = NumService.getANum(numBMin,numBMax);
				ans = numA + numB;
				break;
			case "MULTIPLY":
				operation = " * ";
                		numA = NumService.getANum(numAMinMD,numAMaxMD);	
		                numB = NumService.getANum(numBMinMD,numBMaxMD);
				ans = numA * numB;
				break;
			case "DIVIDE":
				operation = " / ";
               			numB = NumService.getANum(numBMinMD,numBMaxMD);	
                		numA = NumService.getANum(numAMinMD,numAMaxMD) * numB;
				ans = numA/numB;
				break;
			case "MINUS":
				operation = " - ";
               			numA = NumService.getANum(Math.max(numAMin,numBMin),numAMax);

		                if (numA >= numBMin && numA <= numBMax) {
                   			numB = NumService.getANum(numBMin,numA);
		                }
		                else if (numA > numBMax) {
                			numB = NumService.getANum(numBMin,numBMax);
		                }
		                else {
		                    break;
		                }
				ans = numA - numB;
				break;
		}
		var idx = NumService.getANum(0,2);
		switch (idx)
		{
			case 0:
				ques = " ? " + operation + numB + " = " + ans;
				ans = numA;
				break;
			case 1:
				ques = numA + operation + "?" + " = " + ans;
				ans = numB;
				break;
			case 2:
				ques = numA + operation + numB + " = " + "?";
				break;
		}
		return [ques,ans];	
	};		
	
});