app.directive("contactModal", function() {
  return {
    restrict : "E",
    controller: 'contactController',
    templateUrl : '/angular/directives/contactModal.html'
  };
});
