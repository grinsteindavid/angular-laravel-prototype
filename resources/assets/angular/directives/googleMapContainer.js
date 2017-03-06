app.directive("googleMapContainer", function() {
  return {
    restrict : "E",
    controller: 'googleMapController',
    templateUrl : '/angular/directives/googleMapContainer.html'
  };
});
