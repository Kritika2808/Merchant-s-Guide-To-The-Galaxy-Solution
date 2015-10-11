
'use strict';
angular.module('testApp').factory('numeralConversion', function ($rootScope, constants)
{
    var romanValidator = "^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$";

    var if_valid = function(inputArray){
        var result = 0;
        if(inputArray.match(romanValidator)){
            result = 1;
        }
        return result;
    } 

    var romanToNumber = function(inputArray){
        var splittedArray = _.toArray(inputArray);       
        var convertedIntoNumbers = _.map(splittedArray,function(letter){
            return constants.romanValue[letter];
        });

        var j=-1;
        var total = 0;
        var calculatedArabicValue = _.map(convertedIntoNumbers,function(num,i){
            if(i!==j){
                if(convertedIntoNumbers[i]<convertedIntoNumbers[i+1]){
                    j= i+1;
                    total = total + (convertedIntoNumbers[i+1] - convertedIntoNumbers[i])
                }else{
                   total = total + convertedIntoNumbers[i];
                }
            }
            return total;
        })[splittedArray.length-1];

        return calculatedArabicValue;
    }

    var commandParser = function(inputArray){
        var output = _.map(inputArray,function(input){
            if(if_valid(input))
                return romanToNumber(input)
            else
                return 'Wrong input';
        })
        return output;
    }
   
    return {
        commandParser: commandParser
    };
});
