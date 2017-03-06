app.controller("announceController", function($scope, $stateParams, AuthService, NotifyService, AnnounceService) {
  console.log("announceController"); // DEBUGG
  $scope.announces = [];
  $scope.announce = {};
  $scope.newAnnounce = {};
  $scope.announceCounter = 0;
  $scope.announceQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.announceCounter += 1;
    $scope.allowBack = true;
    AuthService.header('announceCounter', $scope.announceCounter);
    AnnounceService.index().then(function success(response) {
      $scope.announces = response.data.announces;
      $scope.announceQuantity = response.data.announceQuantity;
      $scope.announce = {};
      $scope.newAnnounce = {};
      if (!response.data.announces.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.announceCounter) {
      $scope.announceCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('announceCounter', $scope.announceCounter);
    AnnounceService.index().then(function success(response) {
      $scope.announces = response.data.announces;
      $scope.announceQuantity = response.data.announceQuantity;
      $scope.announce = {};
      $scope.newAnnounce = {}
    });
  };

  $scope.fetchAnnounces = function() {
    $scope.announceCounter = 0;
    AuthService.header('announceCounter', $scope.announceCounter);
    AnnounceService.index().then(
      function success(response) {
        $scope.announces = response.data.announces;
        $scope.announceQuantity = response.data.announceQuantity;
        $scope.announce = {};
        $scope.newAnnounce = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  $scope.fetchAnnounces();

  $scope.storeAnnounce = function(announce) {
    $scope.announceCounter = 0;
    AuthService.header('announceCounter', $scope.announceCounter);
    AnnounceService.store(announce).then(
      function success(response) {
        $scope.announces = response.data.announces;
        $scope.announceQuantity = response.data.announceQuantity;
        $scope.announce = {};
        $scope.newAnnounce = {};
        AuthService.redirect('dashboard.announces');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.updateAnnounce = function(announce) {
    $scope.announceCounter = 0;
    AuthService.header('announceCounter', $scope.announceCounter);
    AnnounceService.update(announce).then(
      function success(response) {
        $scope.announces = response.data.announces;
        $scope.announceQuantity = response.data.announceQuantity;
        $scope.announce = {};
        $scope.newAnnounce = {};
        AuthService.redirect('dashboard.announces');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.editAnnounce = function() {
    AnnounceService.edit($stateParams.slug).then(
      function success(response) {
        $scope.rowAnnounce = response.data.announce;
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('dashboard.editannounce')) { $scope.editAnnounce() }

  $scope.destroyAnnounce = function(announce) {
    $scope.announceCounter = 0;
    AuthService.header('announceCounter', $scope.announceCounter);
    AnnounceService.destroy(announce).then(
      function success(response) {
        $scope.announces = response.data.announces;
        $scope.announceQuantity = response.data.announceQuantity;
        $scope.announce = {};
        $scope.newAnnounce = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
