'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('testApp'));

  var MainCtrl,scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  // it('should have a MainCtrl controller', function() {
  //   expect(MainCtrl).toBeDefined();
  // });

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
