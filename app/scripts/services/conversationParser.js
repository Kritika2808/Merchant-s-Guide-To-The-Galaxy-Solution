
'use strict';
angular.module('testApp').factory('conversationParser', function ($rootScope, constants, numeralConversion, determineLineType)
{
    var result= [];
    var lineParser = function(inputArray){
        result = [];
        var lineTypes = _.map(inputArray,function(input){           
            return processLine(input);
        });
        return result;
    }

    var processLine = function(input){
        var sentenceType = determineLineType.type_of_sentence(input);
        switch(sentenceType){
            case 'assigned' : processAssignedStatement(input);
                                break;
            case 'credits' : processCreditStatement(input);
                                break;
            case 'howMuch' : processHowMuchStatement(input);
                                break;
            case 'howMany' : processHowManyStatement(input);
                                break;
            default: result.push('I have no idea what you are talking about, incorrect statement')
                        break;                    

        }
    }

    var processAssignedStatement = function(input){
        input.trim();
        var splittedArray = input.split(' is ');
        constants.romanValue[splittedArray[0].trim()] = splittedArray[1].trim();
    }

    var processCreditStatement = function(input){
        input.trim();
        var str =input.replace(/ is |credits/ig," ").trim();
        str = str.replace(/  /g," ").trim();       
        var splittedArray = str.split(" ");      
        var conconatedRomanString = "", returnedValue;
        for(var i=0; i<splittedArray.length-2; i++){
            conconatedRomanString = conconatedRomanString.concat(constants.romanValue[splittedArray[i].trim()]);
        }
        var arabicValue = numeralConversion.commandParser([conconatedRomanString]);
        if(arabicValue[0] !== "Wrong input"){
            constants.romanValue[splittedArray[splittedArray.length-2].trim()] = parseFloat(splittedArray[splittedArray.length-1].trim()) / parseInt(arabicValue[0]);
            returnedValue = 'saved';
        }else{
            returnedValue = input +" is wrong input"
            result.push(returnedValue);
        }
    }

    var processHowMuchStatement = function(input){
        input.trim();
       
        var str =input.replace(/how|much| is /ig," ").trim();
        str = str.replace("?","").trim();
        str = str.replace(/  /g," ").trim().split(" ");
        var conconatedRomanString = "";
        for(var i=0; i<str.length; i++){
            conconatedRomanString = conconatedRomanString.concat(constants.romanValue[str[i].trim()]);
        }
        var arabicValue = numeralConversion.commandParser([conconatedRomanString]);
        var resultedString;
        if(arabicValue[0] !== "Wrong input"){
            resultedString = str.join(" ") + " is " + arabicValue;
        }else{
            resultedString = str.join(" ") + " is wrong Roman numeral" ;
        }
        result.push(resultedString);
    }

    var processHowManyStatement = function(input){
        input.trim();
        var str =input.replace(/how|many| is |credits/ig," ").trim();
        str = str.replace("?","").trim();
        str = str.replace(/  /g," ").trim().split(" ");
        var conconatedRomanString = "";
        for(var i=0; i<str.length-1; i++){
            conconatedRomanString = conconatedRomanString.concat(constants.romanValue[str[i].trim()]);
        }
        var arabicValue = numeralConversion.commandParser([conconatedRomanString]);
        var returnedValue, resultedString;
        if(arabicValue[0] !== "Wrong input" && parseFloat(constants.romanValue[str[str.length-1].trim()])){
           returnedValue = parseInt(arabicValue[0]) * parseFloat(constants.romanValue[str[str.length-1].trim()]);
           resultedString = str.join(" ") + " is " + returnedValue + " Credits"
        }
        else{
            resultedString = "Wrong input";
        }
        result.push(resultedString);
    }
   
    return {
        commandParser: lineParser
    };
});
