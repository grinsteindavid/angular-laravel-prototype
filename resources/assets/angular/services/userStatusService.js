// User-status Services setup.
app.run(function(UserStatusService, AuthService) {
  // User-status Services declaration.
  var restart = function() {
    if (!AuthService.get('userActive')) {return}
    UserStatusService.restart();
  };

  // Admin-status Services declaration.
  var restartAll = function() {
    if (AuthService.checkRoles(['general', 'client']) || !AuthService.get('userActive')) {return}
    UserStatusService.restartAll();
  };

  // Init services at startup.
  restart();
  restartAll();

  // Intervals
  repeat('10s', restart);
  repeat('20s', restartAll);
});

app.factory("UserStatusService", function($http, $rootScope, AuthService, NotifyService){
  var apiUrl = "/api/";

  var restart = function() {
    console.log('client-status-service');
    $http.get(apiUrl + "client-status-service").then(
      function success(response) {
      },
      function fail(response) {
        console.log(response);
        NotifyService.send('Notificacion del sistema', 'Usted ha perdido la conexion con el servidor.');
        AuthService.remove('userToken');
        AuthService.remove('userRole');
        AuthService.remove('userActive');
        AuthService.remove('room_name');
        AuthService.remove('room_active');
        $rootScope.isActive = false;
        $rootScope.chatActive = false;
        NotifyService.send('error', response.data);
        window.location.replace('/');
      }
    );
  };

  var restartAll = function() {
    console.log('admin-status-service');
    $http.get(apiUrl + "admin-status-service").then(
      function succes(response) {
      },
      function fail(response) {
        console.log(response);
        NotifyService.send('Notificacion del sistema', 'Usted ha perdido la conexion con el servidor.');
        AuthService.remove('userToken');
        AuthService.remove('userRole');
        AuthService.remove('userActive');
        AuthService.remove('room_name');
        AuthService.remove('room_active');
        $rootScope.isActive = false;
        $rootScope.chatActive = false;
        NotifyService.send('error', response.data);
        window.location.replace('/');
      }
    );
  };

  return {
    restart: restart,
    restartAll: restartAll
  };
});
