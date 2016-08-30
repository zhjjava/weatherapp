// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.cnt = $routeParams.cnt || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=8f1a32b0c4350081b1aab5681f3d49c0", { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.cnt });
    
    $scope.convertToReadableStr = function(degK) {
        console.log(degK);
        return Math.round((1.8 * (degK - 273)) + 32)+"°F/"+(degK - 273).toFixed(2)+"°C.";
        
    }
    
    $scope.convertToDate = function(dt) { 
      
        return new Date(dt * 1000);
        
    };
    
}]);