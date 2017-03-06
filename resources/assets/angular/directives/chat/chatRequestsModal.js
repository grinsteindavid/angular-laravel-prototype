app.directive("chatRequestsModal", function() {
  return {
    restrict : "E",
    controller: 'chatRequestController',
    templateUrl : '/angular/directives/chat/chatRequestsModal.html'
  };
});
