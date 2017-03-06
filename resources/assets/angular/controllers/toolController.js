app.controller("toolController", function($scope, $stateParams, AuthService, NotifyService, ToolService) {
  console.log("toolController"); // DEBUGG
  $scope.tools = [];
  $scope.tool = {};
  $scope.newTool = {};
  $scope.toolCounter = 0;
  $scope.toolQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.toolCounter += 1;
    $scope.allowBack = true;
    AuthService.header('toolCounter', $scope.toolCounter);
    ToolService.index().then(function success(response) {
      $scope.tools = response.data.tools;
      $scope.toolQuantity = response.data.toolQuantity;
      $scope.tool = {};
      $scope.newTool = {};
      if (!response.data.tools.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.toolCounter) {
      $scope.toolCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('toolCounter', $scope.toolCounter);
    ToolService.index().then(function success(response) {
      $scope.tools = response.data.tools;
      $scope.toolQuantity = response.data.toolQuantity;
      $scope.tool = {};
      $scope.newTool = {}
    });
  };

  $scope.fetchTools = function() {
    $scope.toolCounter = 0;
    AuthService.header('toolCounter', $scope.toolCounter);
    ToolService.index().then(
      function success(response) {
        $scope.tools = response.data.tools;
        $scope.toolQuantity = response.data.toolQuantity;
        $scope.tool = {};
        $scope.newTool = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  $scope.fetchTools();

  $scope.storeTool = function(tool) {
    $scope.toolCounter = 0;
    AuthService.header('toolCounter', $scope.toolCounter);
    ToolService.store(tool).then(
      function success(response) {
        $scope.tools = response.data.tools;
        $scope.toolQuantity = response.data.toolQuantity;
        $scope.tool = {};
        $scope.newTool = {};
        AuthService.redirect('dashboard.tools');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };

  $scope.updateTool = function(tool) {
    $scope.toolCounter = 0;
    AuthService.header('toolCounter', $scope.toolCounter);
    ToolService.update(tool).then(
      function success(response) {
        $scope.tools = response.data.tools;
        $scope.toolQuantity = response.data.toolQuantity;
        $scope.tool = {};
        $scope.newTool = {};
        AuthService.redirect('dashboard.tools');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };

  $scope.editTool = function() {
    console.log('edit tool function');
    ToolService.edit($stateParams.slug).then(
      function success(response) {
        $scope.rowTool = response.data.tool;
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('dashboard.edittool')) { $scope.editTool() }

  $scope.destroyTool = function(tool) {
    $scope.toolCounter = 0;
    AuthService.header('toolCounter', $scope.toolCounter);
    ToolService.destroy(tool).then(
      function success(response) {
        $scope.tools = response.data.tools;
        $scope.toolQuantity = response.data.toolQuantity;
        $scope.tool = {};
        $scope.newTool = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
