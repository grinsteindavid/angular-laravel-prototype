app.directive("testimonialForm", function() {
  return {
    restrict : "E",
    controller: 'testimonialController',
    templateUrl : '/angular/directives/testimonialForm.html'
  };
});
