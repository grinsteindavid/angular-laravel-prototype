app.directive("chatContainer", function() {
  return {
    restrict : "E",
    controller: 'chatController',
    templateUrl : '/angular/directives/chat/chatContainer.html'
  };
});
