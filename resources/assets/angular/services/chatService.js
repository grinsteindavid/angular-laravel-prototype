app.run(function($rootScope, ChatService, AuthService) {
  var checkStatus = function() {
    var userActive = AuthService.get('userActive');
    if (!userActive || $rootScope.connected) {return};
    ChatService.checkStatus();
  };

  // Intervals
  repeat('9s', checkStatus);
});

app.factory("ChatService", function($http, $rootScope, AuthService){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "chat");
  };
  var store = function(message) {
    return $http.post(apiUrl + "chat", message);
  };
  var destroy = function() {
    return $http.get(apiUrl + "chat/close");
  };
  var checkStatus = function() {
    console.log('chat/status');
    $http.get(apiUrl + "chat/status").then(
      function success(response) {
        var userActive = AuthService.get('userActive');
        AuthService.put('room_name', response.data.room_name, 7);
        AuthService.put('room_active', response.data.room_active, 7);
        if (response.data.room_active && userActive) {
          $rootScope.fetchMessages();
        }
      },
      function fail(response) {
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };

  return {
    index: index,
    store: store,
    destroy: destroy,
    checkStatus: checkStatus
  };
});
