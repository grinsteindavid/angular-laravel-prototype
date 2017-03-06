app.directive("loginModal", function() {
  return {
    restrict : "E",
    controller: 'loginController',
    templateUrl : '/angular/directives/loginModal.html'
  };
});
