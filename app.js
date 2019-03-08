(function (){
'use strict';

      angular.module('lunch', [])
      .controller('lunchController', MsgController);

      MsgController.$inject = ['$scope', '$filter'];
      function MsgController($scope, $filter) {
      $scope.items = "";
      $scope.message = "";
      $scope.typeOfMessage = "";

      $scope.verifyItems = function () {
        var splitItmes = $scope.items.split(','); /*We separated the items by comma*/
        var totalItems =splitItmes.length;

        for (var i=0; i<splitItmes.length; i++){/*Verify that there is not a blank space*/
          if((splitItmes[i].trim() == "")){
            totalItems = totalItems -1;
          }
        }

        $scope.message = totalItems; /*Show the message*/
        if(totalItems==0){
          $scope.message = "Please enter data first!" ;
        }else if((totalItems >0) && (totalItems <= 3 )){
          $scope.message = "Enjoy!" ;
          $scope.typeOfMessage = "has-success";
        }else if (totalItems >3) {
          $scope.message ="Too much!" ;
          $scope.typeOfMessage = "has-warning";
        }

      };
      }
})();
