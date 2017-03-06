// App service setup
app.run(function(AuthService, $rootScope) {
  // Set generic user role.
  if (!AuthService.get('userRole')) { AuthService.put('userRole', 'general', 364) }

  // Set user token.
  AuthService.header('userToken', AuthService.get('userToken'));

  // Set user status.
  $rootScope.isActive = AuthService.get('userActive');
});

app.factory("AuthService", function($http, $state, $rootScope, NotifyService){
  var apiUrl = "/api/";

  var header = function(name, value) {
    $http.defaults.headers.common[name] = value;
  };

  var put = function(name, data, days) {
    return $cookies.set(name, data, { expires: days});
  };

  var get = function(name) {
    return $cookies.get(name);
  };

  var remove = function(name) {
    return $cookies.remove(name);
  };

  var redirect = function(url) {
    return $state.go(url);
  };

  var checkRoute = function(name, options) {
    return $state.is(name);
  };

  var login = function(user) {
    return $http.post(apiUrl + "login", user);
  };

  var checkRoles = function(roles) {
    for(role in roles) {
      if ($cookies.get('userRole') === roles[role]) {
        return true;
      }
    }
    return false;
  };

  var checkLogin = function() {
    if ($cookies.get('userActive')) {

      $state.go('/');
    }
  };

  var register = function(user) {
    return $http.post(apiUrl + "register", user);
  };

  return {
    login: login,
    register: register,
    checkRoles: checkRoles,
    checkLogin: checkLogin,
    checkRoute: checkRoute,
    redirect: redirect,
    get: get,
    put: put,
    remove: remove,
    header: header
  };
});
