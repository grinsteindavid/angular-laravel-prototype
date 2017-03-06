app.controller("inventoryController", function($scope, $stateParams, AuthService, NotifyService, SolutionService, ProjectService, CategoryService) {
  console.log("inventoryController");
  $scope.categories = [];
  $scope.projects = [];
  $scope.solutions = [];
  $scope.solution = {};
  $scope.newSolution = {};
  $scope.solutionCounter = 0;
  $scope.solutionQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;
  $scope.slickConfig = {
    enabled: true,
    mobileFirst: true,
    autoplay: true,
    draggable: true,
    dots: true,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    autoplaySpeed: 2000,
    method: {},
    event: {
      beforeChange: function (event, slick, currentSlide, nextSlide) {
      },
      afterChange: function (event, slick, currentSlide, nextSlide) {
      }
    },
    responsive: [
      {
        breakpoint: 920,
        settings: {
          centerMode: true,
          centerPadding: '20px',
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          centerPadding: '0px',
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.solutionCounter += 1;
    $scope.allowBack = true;
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.index().then(function success(response) {
      $scope.solutions = response.data.solutions;
      $scope.solutionQuantity = response.data.solutionQuantity;
      $scope.solution = {};
      $scope.newSolution = {};
      if (!response.data.solutions.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.solutionCounter) {
      $scope.solutionCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.index().then(function success(response) {
      $scope.solutions = response.data.solutions;
      $scope.solutionQuantity = response.data.solutionQuantity;
      $scope.solution = {};
      $scope.newSolution = {}
    });
  };

  $scope.fetchSolutions = function() {
    $scope.solutionCounter = 0;
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.index().then(
      function success(response) {
        $scope.solutions = response.data.solutions;
        $scope.solutionQuantity = response.data.solutionQuantity;
        $scope.solution = {};
        $scope.newSolution = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (!$stateParams.slug) { $scope.fetchSolutions() }

  $scope.fetchCategories = function() {
    CategoryService.indexNames().then(function success(response) {
      $scope.categories = response.data.categories;
    });
  };
  if (AuthService.checkRoute('dashboard.createsolution') || AuthService.checkRoute('dashboard.editsolution')) { $scope.fetchCategories() }

  $scope.storeSolution = function(solution) {
    $scope.solutionCounter = 0;
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.store(solution).then(
      function success(response) {
        console.log(response);
        $scope.solutions = response.data.solutions;
        $scope.solutionQuantity = response.data.solutionQuantity;
        $scope.solution = {};
        $scope.newSolution = {};
        AuthService.redirect('dashboard.inventory');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.editSolution = function() {
    SolutionService.edit($stateParams.slug).then(
      function success(response) {
        $scope.newSolution = response.data.solution;
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('dashboard.editsolution')) { $scope.editSolution() }

  $scope.updateSolution = function(solution) {
    $scope.solutionCounter = 0;
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.update(solution).then(
      function success(response) {
        $scope.solutions = response.data.solutions;
        $scope.solutionQuantity = response.data.solutionQuantity;
        AuthService.redirect('dashboard.inventory');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.destroySolution = function(solution) {
    $scope.solutionCounter = 0;
    AuthService.header('solutionCounter', $scope.solutionCounter);
    SolutionService.destroy(solution).then(
      function success(response) {
        $scope.solutions = response.data.solutions;
        $scope.solutionQuantity = response.data.solutionQuantity;
        $scope.solution = {};
        $scope.newSolution = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
