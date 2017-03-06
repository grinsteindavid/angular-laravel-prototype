app.controller("registerController", function($scope, $rootScope, AuthService, NotifyService, ProfileService) {
  console.log('registerController');
  $scope.user = {};
  $scope.date = {
    min: new Date('1910-01-01').toString(),
    max: new Date('2010-01-01').toString()
  };

  $scope.fetchProfile = function() {
    ProfileService.show().then(function success(response) {
      $rootScope.form.email = response.data.email;
      $rootScope.form.name = response.data.person.first_name + " " + response.data.person.last_name;
    });
  };
  $scope.register = function(user) {
    AuthService.register(user).then(
      function success(response) {
        AuthService.put('userToken', response.data.userToken, 7);
        AuthService.put('userRole', response.data.userRole, 7);
        AuthService.put('userActive', true, 7);
        AuthService.put('PUSHER_KEY', response.data.pusher_key, 7);
        AuthService.header('userToken', response.data.userToken);
        NotifyService.send('Notificacion del sistema', 'Usted se ha registrado correctamente.');
        $rootScope.isActive = true;
        $scope.user = {};
        $scope.fetchProfile();
        AuthService.redirect('/');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', response.data);
      }
    );
  };
});
