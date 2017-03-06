app.controller("projectController", function($scope, $stateParams, AuthService, NotifyService, ProjectService, SolutionService) {
  console.log("projectController");
  $scope.projects = [];
  $scope.project = {};
  $scope.newProject = {};
  $scope.solutions = [];
  $scope.projectCounter = 0;
  $scope.projectQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.projectCounter += 1;
    $scope.allowBack = true;
    AuthService.header('projectCounter', $scope.projectCounter);
    ProjectService.index().then(function success(response) {
      $scope.projects = response.data.projects;
      $scope.projectQuantity = response.data.projectQuantity;
      $scope.project = {};
      $scope.newProject = {};
      if (!response.data.projects.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.projectCounter) {
      $scope.projectCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('projectCounter', $scope.projectCounter);
    ProjectService.index().then(function success(response) {
      $scope.projects = response.data.projects;
      $scope.projectQuantity = response.data.projectQuantity;
      $scope.project = {};
      $scope.newProject = {}
    });
  };

  $scope.fetchSolutions = function() {
    SolutionService.indexNames().then(function success(response) {
      $scope.solutions = response.data.solutions;
    });
  };
  if (AuthService.checkRoute('dashboard.editproject') || AuthService.checkRoute('dashboard.createproject')) {
    $scope.fetchSolutions();
  }

  $scope.fetchProjects = function() {
    $scope.projectCounter = 0;
    AuthService.header('projectCounter', $scope.projectCounter);
    ProjectService.index().then(
      function success(response) {
        $scope.projects = response.data.projects;
        $scope.projectQuantity = response.data.projectQuantity;
        $scope.project = {};
        $scope.newProject = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (!$stateParams.slug) { $scope.fetchProjects() }

  $scope.showProject = function() {
    ProjectService.show($stateParams.slug).then(
      function success(response) {
        $scope.project = response.data.project;
    },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('project')) { $scope.showProject() }

  $scope.storeProject = function(project) {
    $scope.projectCounter = 0;
    AuthService.header('projectCounter', $scope.projectCounter);
    ProjectService.store(project).then(
      function success(response) {
        $scope.projects = response.data.projects;
        $scope.projectQuantity = response.data.projectQuantity;
        $scope.project = {};
        $scope.newProject = {};
        AuthService.redirect('dashboard.projects');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.editProject = function() {
    ProjectService.edit($stateParams.slug).then(
      function success(response) {
        $scope.newProject = response.data.project;
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('dashboard.editproject')) { $scope.editProject() }

  $scope.updateProject = function(project) {
    $scope.projectCounter = 0;
    AuthService.header('projectCounter', $scope.projectCounter);
    ProjectService.update(project).then(
      function success(response) {
        $scope.projects = response.data.projects;
        $scope.projectQuantity = response.data.projectQuantity;
        AuthService.redirect('dashboard.projects');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.destroyProject = function(project) {
    $scope.projectCounter = 0;
    AuthService.header('projectCounter', $scope.projectCounter);
    ProjectService.destroy(project).then(
      function success(response) {
        $scope.projects = response.data.projects;
        $scope.projectQuantity = response.data.projectQuantity;
        $scope.project = {};
        $scope.newProject = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
