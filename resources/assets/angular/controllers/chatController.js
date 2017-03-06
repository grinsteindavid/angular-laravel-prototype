app.controller("chatController", function($scope, $rootScope, $pusher, AuthService, NotifyService, ChatService) {
  console.log("chatController"); // DEBUGG
  $scope.newMessage = {};
  $scope.messages = [];
  $scope.disabled = false;
  $rootScope.connected = false;

  var client, pusher, channel;

  $scope.connect = function() {
    $rootScope.chatActive = true;
    $rootScope.connected = true;
    client = new Pusher(AuthService.get('PUSHER_KEY'));
    pusher = $pusher(client);
    channel = pusher.subscribe(AuthService.get('room_name'));
    NotifyService.send('Notificacion del sistema', 'Se ha conectado a la sala con exito.');

    channel.bind('new-message', function(response) {
      if (!response.room_active) {
        $scope.disconnect();
      } else {
        $scope.messages.push(response.message);
      }
    });
  };

  $scope.disconnect = function() {
    $rootScope.chatActive = false;
    $rootScope.connected = false;
    channel.unbind('new-message');
    pusher.unsubscribe(AuthService.get('room_name'));
    AuthService.remove('room_active');
    AuthService.remove('room_name');
    NotifyService.send('Notificacion del sistema', 'La sala ha sido cerrada por el administrador.');
  };

  $scope.send = function(message) {
    $scope.disabled = true;
    AuthService.header('room_name', AuthService.get('room_name'));
    ChatService.store(message).then(
      function success(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
      },
      function fail(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };

  $scope.sendByEnter = function(event, message) {
    if (event.which !== 13) { return }
    $scope.disabled = true;
    AuthService.header('room_name', AuthService.get('room_name'));
    ChatService.store(message).then(
      function success(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
      },
      function fail(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };

  $scope.closeRoom = function() {
    $scope.disabled = true;
    AuthService.header('room_name', AuthService.get('room_name'));
    ChatService.destroy().then(
      function success(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
      },
      function fail(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };

  $rootScope.fetchMessages = function() {
    if ($rootScope.connected) {return};
    $scope.disabled = true;
    AuthService.header('room_name', AuthService.get('room_name'));
    ChatService.index().then(
      function success(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
        $scope.messages = response.data.messages.reverse();
        $scope.connect();
      },
      function fail(response) {
        $scope.disabled = false;
        $scope.newMessage = {};
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };
});
