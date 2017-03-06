app.controller("loginController", function($scope, $rootScope, AuthService, NotifyService, ProfileService) {
  console.log("loginController");
  $scope.user = {};

  $scope.fetchProfile = function() {
    ProfileService.show().then(function success(response) {
      $rootScope.form.email = response.data.email;
      $rootScope.form.name = response.data.person.first_name + " " + response.data.person.last_name;
    });
  };
  $scope.login = function(user) {
    AuthService.login(user).then(
      function success(response) {
        AuthService.put('userToken', response.data.userToken, 7);
        AuthService.put('userRole', response.data.userRole, 7);
        AuthService.put('userActive', true, 7);
        AuthService.put('PUSHER_KEY', response.data.pusher_key, 7);
        AuthService.put('room_name', response.data.room_name, 7);
        AuthService.put('room_active', response.data.room_active, 7);
        AuthService.header('userToken', response.data.userToken);
        $rootScope.isActive = true;
        $rootScope.chatActive = response.data.room_active;
        $scope.user = {};
        $scope.fetchProfile();
        if (response.data.room_active) {$rootScope.fetchMessages()};
        NotifyService.send('Notificacion del sistema', 'Usted ha iniciado sesion correctamente.');
        AuthService.redirect('/');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };
});
