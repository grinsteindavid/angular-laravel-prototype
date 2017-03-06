app.controller("solutionController", function($scope, $stateParams, AuthService, NotifyService, SolutionService, CategoryService) {
  console.log("solutionController"); // DEBUGG
  $scope.choice_category = {name: 'Ninguna'};
  $scope.solutions = [];
  $scope.solution = {};
  $scope.solutionCounter = 0;
  $scope.busy = false;
  $scope.busyIcon = true;

  $scope.fetchSolutions = function() {
    $scope.busyIcon = true;
    $scope.busy = true;
    AuthService.header('choice_category', $scope.choice_category.name);
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.index().then(
      function success(response) {
        $scope.solutionCounter += 1;
        // Push new solutions
        $.each(response.data.solutions, function(index, val) {
          $scope.solutions.push(val);
        });
        $scope.busy = false;
        $scope.busyIcon = false;
      },
      function fail(response) {
        $scope.debug = response.data;
        $scope.busy = true;
        $scope.busyIcon = false;
      }
    );
  };

  $scope.showSolution = function() {
    SolutionService.show($stateParams.slug).then(
      function success(response) {
        $scope.solution = response.data.solution;
    },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('solution')) { $scope.showSolution() }

  $scope.cleanSolutions = function() {
    $scope.solutions = [];
    $scope.solutionCounter = 0;
    $scope.busyIcon = true;
    $scope.busy = true;
    AuthService.header('choice_category', $scope.choice_category.name);
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.index().then(
      function success(response) {
        $scope.solutionCounter += 1;
        // Push new solutions
        $.each(response.data.solutions, function(index, val) {
          $scope.solutions.push(val);
        });
        $scope.busy = false;
        $scope.busyIcon = false;
      },
      function fail(response) {
        $scope.debug = response.data;
        $scope.busy = true;
        $scope.busyText = '';
        $scope.busyIcon = false;
      }
    );
  };

  $scope.fetchCategories = function() {
    CategoryService.index().then(function success(response) {
      $scope.categories = response.data.categories;
    });
  };
  $scope.fetchCategories();

  $scope.changeCategory = function(categoryName) {
    $scope.choice_category = {name: categoryName};
    $scope.cleanSolutions();
  };
});
