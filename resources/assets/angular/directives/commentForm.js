app.directive("commentForm", function() {
  return {
    restrict : "E",
    controller: 'commentController',
    templateUrl : '/angular/directives/commentForm.html'
  };
});
