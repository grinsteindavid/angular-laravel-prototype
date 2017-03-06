app.controller("chatRequestController", function($scope, $rootScope, AuthService, NotifyService, ChatRequestService) {
  console.log("chatRequestController"); // DEBUGG
  $scope.requests = [];
  $scope.request = {};
  $scope.requestCounter = 0;
  $rootScope.requestQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.requestCounter += 1;
    $scope.allowBack = true;
    AuthService.header('requestCounter', $scope.requestCounter);
    ChatRequestService.index().then(function success(response) {
      $scope.requests = response.data.chatRequests;
      $scope.requestQuantity = response.data.requestQuantity;
      $scope.request = {};
      if (!response.data.chatRequests.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.requestCounter) {
      $scope.requestCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('requestCounter', $scope.requestCounter);
    ChatRequestService.index().then(function success(response) {
      $scope.requests = response.data.chatRequests;
      $scope.requestQuantity = response.data.requestQuantity;
      $scope.request = {};
    });
  };

  $scope.fetchRequests = function() {
    if (AuthService.checkRoles(['client', 'general']) || !AuthService.get('userActive')) { return }
    $scope.requestCounter = 0;
    AuthService.header('requestCounter', $scope.requestCounter);
    ChatRequestService.index().then(
      function success(response) {
        $scope.requests = response.data.chatRequests;
        $scope.requestQuantity = response.data.requestQuantity;
        $scope.request = {};
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  $scope.fetchRequests();
  repeat('15s', $scope.fetchRequests);

  $rootScope.storeRequest = function() {
    if (AuthService.checkRoles(['admin']) || !AuthService.get('userActive')) { return }
    ChatRequestService.store($scope.request).then(
      function success(response) {
        $scope.request = {};
        NotifyService.send('Notificacion del sistema', 'Solicitud creada con exito.');
      },
      function fail(response) {
        $scope.request = {};
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Usted ya posee una solicitud en espera.');
      }
    );
  };

  $scope.destroyRequest = function(request) {
    $scope.requestCounter = 0;
    AuthService.header('requestCounter', $scope.requestCounter);
    ChatRequestService.destroy(request).then(
      function success(response) {
        $scope.requests = response.data.chatRequests;
        $scope.requestQuantity = response.data.requestQuantity;
        $scope.request = {};
        $scope.fetchRequests();
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };

  $scope.acceptRequest = function(request) {
    ChatRequestService.acceptRequest(request).then(
      function success(response) {
        AuthService.put('room_active', response.data.room_active, 30);
        AuthService.put('room_name', response.data.room_name, 30);
        $scope.request = {};
        if (response.data.room_name && response.data.room_active && AuthService.get('userActive')) {
          $rootScope.fetchMessages();
        }
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
