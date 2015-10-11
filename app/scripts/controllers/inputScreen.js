'use strict';

angular.module('testApp').controller('InputScreenCtrl', function ($scope,$rootScope,conversationParser,numeralConversion) {

	$rootScope.activeClass = true;
	$rootScope.mainClass = false;
  	$scope.user = {
        text: ''
    };

    $scope.master = {};
    $scope.enteredCommands = {
      	text:[]
    };

    $scope.update = function(command) {
        $scope.enteredCommands.text.push(command);
        $scope.user.text = '';
    };

    $scope.generateOutput = function(inputArray){
      	$scope.arabicOutput = [];
      	var output = conversationParser.commandParser(inputArray)
      	$scope.arabicOutput = output;   	
    }

});