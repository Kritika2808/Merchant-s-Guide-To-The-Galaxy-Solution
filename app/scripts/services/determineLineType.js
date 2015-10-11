'use strict';
angular.module('testApp').factory('determineLineType', function ($rootScope, constants)
{
    var patternAssigned = "^([A-Za-z]+) is ([I|V|X|L|C|D|M])$";
    var patternCredits = "^([A-Za-z]+)([A-Za-z\\s]*) is ([0-9]+) ([c|C]redits)$";
    // [1-9]\d*(\.\d+)
    // ([0-9]+)
    var patternHowMuch = "^how much is (([A-Za-z\\s])+)\\?$";
    var patternHowMany= "^how many [c|C]redits is (([A-Za-z\\s])+)\\?$";

    var lineFilters=[
        {
            type:'assigned',
            pattern: patternAssigned
        },
        {
            type:'credits',
            pattern: patternCredits
        },
        {
            type:'howMuch',
            pattern: patternHowMuch
        },
        {
            type:'howMany',
            pattern: patternHowMany
        }
    ];

    var type_of_sentence = function(input){
        input.trim();
        var type = 'noMatch';
        for(var i=0; i < lineFilters.length; i++){
            if(input.match(lineFilters[i].pattern)){
                type = lineFilters[i].type;
            }
        }

        return type;
    }


    return{
        type_of_sentence : type_of_sentence
    }

});