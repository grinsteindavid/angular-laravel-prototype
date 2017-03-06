app.directive("testimonialContainer", function() {
  return {
    restrict : "E",
    controller: 'testimonialController',
    templateUrl : '/angular/directives/testimonialContainer.html'
  };
});
