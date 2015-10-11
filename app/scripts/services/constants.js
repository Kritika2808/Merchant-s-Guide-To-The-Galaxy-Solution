'use strict';
angular.module('testApp').factory('constants', function ($rootScope)
{
    // var R = 10;

    // var romanValue = function(charPassed){
    //     int value = -1;
    //     switch(charPassed){
    //         case 'I' : value = ;
    //                     break;
    //         case 'V' : value = Roman.V.getValue();
    //                     break;
    //         case 'X' : value = Roman.X.getValue();
    //                     break;
    //         case 'L' : value = Roman.L.getValue();
    //                     break;
            
    //         case 'C' : value = Roman.C.getValue();
    //                     break;
            
    //         case 'D' : value = Roman.D.getValue();
    //                     break;
            
    //         case 'M' : value = Roman.M.getValue();
    //                     break;
    //     }
    // }

    // Tell, don't ask principle to objects.

    var romanValue = {
        'I' : 1,
        'V' : 5,
        'X' : 10,
        'L' : 50,
        'C' : 100,
        'D' : 500,
        'M' : 1000
    }
    
   
    return {
        romanValue: romanValue
    };
});
