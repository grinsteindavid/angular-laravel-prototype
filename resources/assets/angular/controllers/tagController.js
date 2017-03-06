app.controller("tagController", function($scope, $stateParams, AuthService, NotifyService, TagService) {
  console.log("tagController"); // DEBUGG
  $scope.tags = [];
  $scope.tag = {};
  $scope.newTag = {};
  $scope.tagCounter = 0;
  $scope.tagQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.tagCounter += 1;
    $scope.allowBack = true;
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.index().then(function success(response) {
      $scope.tags = response.data.tags;
      $scope.tagQuantity = response.data.tagQuantity;
      $scope.tag = {};
      $scope.newTag = {};
      if (!response.data.tags.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.tagCounter) {
      $scope.tagCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.index().then(function success(response) {
      $scope.tags = response.data.tags;
      $scope.tagQuantity = response.data.tagQuantity;
      $scope.tag = {};
      $scope.newTag = {}
    });
  };

  $scope.fetchTags = function() {
    $scope.tagCounter = 0;
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.index().then(
      function success(response) {
        $scope.tags = response.data.tags;
        $scope.tagQuantity = response.data.tagQuantity;
        $scope.tag = {};
        $scope.newTag = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (!$stateParams.slug) { $scope.fetchTags() }

  $scope.showTag = function() {
    $scope.tagCounter = 0;
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.show($stateParams.slug).then(function success(response) {
      $scope.tags = {};
      $scope.tag = response.tag.data;
      $scope.newTag = {}
    });
  };
  if ($stateParams.slug) { $scope.showTag() }

  $scope.storeTag = function(tag) {
    $scope.tagCounter = 0;
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.store(tag).then(
      function success(response) {
        $scope.tags = response.data.tags;
        $scope.tagQuantity = response.data.tagQuantity;
        $scope.tag = {};
        $scope.newTag = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.updateTag = function(tag) {
    $scope.tagCounter = 0;
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.update(tag).then(
      function success(response) {
        $scope.tags = response.data.tags;
        $scope.tagQuantity = response.data.tagQuantity;
        $scope.tag = {};
        $scope.newTag = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.destroyTag = function(tag) {
    $scope.tagCounter = 0;
    AuthService.header('tagCounter', $scope.tagCounter);
    TagService.destroy(tag).then(
      function success(response) {
        $scope.tags = response.data.tags;
        $scope.tagQuantity = response.data.tagQuantity;
        $scope.tag = {};
        $scope.newTag = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
