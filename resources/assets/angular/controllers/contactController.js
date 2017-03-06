app.controller("contactController", function($scope, $rootScope, AuthService, NotifyService, ContactService) {
  console.log("contactController"); // DEBUGG
  $rootScope.form = {};

  $scope.storeForm = function(form) {
    ContactService.store(form).then(
      function success(response) {
        $scope.form = {};
        NotifyService.send('Notificacion del sistema', response.data.message);
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
