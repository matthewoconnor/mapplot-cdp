(function(){
  angular.module("MapApplication")
  	.controller('KmlMapCreateController', function($scope, $log, $http) {
  		
    		$scope.kmlmap = {};

        $scope.areaMapAutocomplete = {
          searchText : "",
          getMatches : function(query) {
            return $http.get(
              "/app/areamap/autocomplete/", 
              {"params":{"query":query}}
            ).then(function(response){
              return response.data.results
            });
          },
          selectedItemChanged : function(item) {
            $scope.kmlmap.area_map = item;
          }
        }

        $scope.submitForm =function() {

          console.log("SUBMITTED FORM");

          var submitData = angular.copy($scope.kmlmap);
          submitData.area_map = $scope.kmlmap.id;

          $http.post("/app/kmlmap/create/", {"params":submitData}).then(function(response){
            if(response.data.kmlmap){
              var newkmlmap = response.data.kmlmap;
              $scope.kmlfiles.unshift(newkmlmap);
              $scope.kmlmap = {};
            }
          });

        }

    	});
})();