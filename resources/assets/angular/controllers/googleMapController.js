app.controller('googleMapController', function($scope, AuthService, NotifyService, GoogleMapService) {
  console.log("googleMapController");

  $scope.map = {
    center: [39.74, -74.18],
    zoom: 8
  };

  $scope.positions = {
    eeuu: [39.74, -74.18],
    argentina: [40.74, -74.18],
    venezuela: [41.74, -74.18]
  };

  $scope.markers = {
    eeuu: [39.74, -74.18],
    argentina: [40.74, -74.18],
    venezuela: [41.74, -74.18]
  };

  $scope.changePosition = function(name) {
    $scope.map.center = $scope.positions[name];
    $scope.map.zoom = 8;
  };
});
