app.controller("categoryController", function($scope, $stateParams, AuthService, NotifyService, CategoryService) {
  console.log("categoryController"); // DEBUGG
  $scope.categories = [];
  $scope.category = {};
  $scope.newCategory = {};
  $scope.categoryCounter = 0;
  $scope.categoryQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.categoryCounter += 1;
    $scope.allowBack = true;
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.index().then(function success(response) {
      $scope.categories = response.data.categories;
      $scope.categoryQuantity = response.data.categoryQuantity;
      $scope.category = {};
      $scope.newCategory = {};
      if (!response.data.categories.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.categoryCounter) {
      $scope.categoryCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.index().then(function success(response) {
      $scope.categories = response.data.categories;
      $scope.categoryQuantity = response.data.categoryQuantity;
      $scope.category = {};
      $scope.newCategory = {}
    });
  };

  $scope.fetchCategories = function() {
    $scope.categoryCounter = 0;
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.index().then(
      function success(response) {
        $scope.categories = response.data.categories;
        $scope.categoryQuantity = response.data.categoryQuantity;
        $scope.category = {};
        $scope.newCategory = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (!$stateParams.slug) { $scope.fetchCategories() }

  $scope.showCategory = function() {
    $scope.categoryCounter = 0;
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.show($stateParams.slug).then(function success(response) {
      $scope.categories = {};
      $scope.category = response.category.data;
      $scope.newCategory = {}
    });
  };
  if ($stateParams.slug) { $scope.showCategory() }

  $scope.storeCategory = function(category) {
    $scope.categoryCounter = 0;
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.store(category).then(
      function success(response) {
        $scope.categories = response.data.categories;
        $scope.categoryQuantity = response.data.categoryQuantity;
        $scope.category = {};
        $scope.newCategory = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.updateCategory = function(category) {
    $scope.categoryCounter = 0;
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.update(category).then(
      function success(response) {
        $scope.categories = response.data.categories;
        $scope.categoryQuantity = response.data.categoryQuantity;
        $scope.category = {};
        $scope.newCategory = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.destroyCategory = function(category) {
    $scope.categoryCounter = 0;
    AuthService.header('categoryCounter', $scope.categoryCounter);
    CategoryService.destroy(category).then(
      function success(response) {
        $scope.categories = response.data.categories;
        $scope.categoryQuantity = response.data.categoryQuantity;
        $scope.category = {};
        $scope.newCategory = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
