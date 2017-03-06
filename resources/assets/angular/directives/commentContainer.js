app.directive("commentContainer", function() {
  return {
    restrict : "E",
    controller: 'commentController',
    templateUrl : '/angular/directives/commentContainer.html'
  };
});
