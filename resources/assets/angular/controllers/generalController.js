app.controller("generalController", function($scope, $rootScope, AuthService, NotifyService) {
  console.log("generalController");
  $rootScope.showDebug = false;
  $scope.role = AuthService.get('userRole');
  $rootScope.isActive = AuthService.get('userActive');

  $scope.logout = function() {
    AuthService.remove('room_name');
    AuthService.remove('room_active');
    AuthService.remove('userToken');
    AuthService.remove('userRole');
    AuthService.remove('userActive');
    $rootScope.isActive = false;
    $rootScope.chatActive = false;
    $rootScope.form = {};
    $scope.role = 'general';
    NotifyService.send('Notificacion del sistema', 'Usted ha cerrado sesion correctamente.');
    AuthService.redirect('/');
  };
  $rootScope.isAdmin = function() {
    return AuthService.checkRoles(['admin']);
  };
});
