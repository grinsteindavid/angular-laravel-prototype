app.controller("profileController", function($scope, AuthService, NotifyService, ProfileService) {
  console.log("profileController"); // DEBUGG
  AuthService.checkRoles(['client', 'admin']);
  $scope.user = {};
  $scope.fullName = '';

  $scope.fetchProfile = function() {
    ProfileService.show().then(function success(response) {
      $scope.user = response.data;
      $scope.fullName = response.data.person.first_name + " " + response.data.person.last_name;
    });
  };
  $scope.fetchProfile();
  $scope.updateProfile = function(user) {
    ProfileService.update(user).then(
      function success(response) {
        $scope.user = {};
        $scope.user = response.data;
        $scope.user.person.date_of_birth.toLocaleString().replace('at ', '');
        $scope.fullName = response.data.person.first_name + " " + response.data.person.last_name;
        NotifyService.send('Aviso del sistema', 'Su perfil ha sido modificado con exito.');
      },
      function fail(response) {
        NotifyService.send('Aviso del sistema', response.data);
        $scope.debug = response.data;
      }
    );
  };

});
