app.controller("postController", function($scope, $stateParams, AuthService, NotifyService, PostService, TagService) {
  console.log("postController");
  $scope.tags = [];
  $scope.posts = [];
  $scope.post = {};
  $scope.newPost = {};
  $scope.postCounter = 0;
  $scope.postQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;
  AuthService.header('choice_tag', 'Ninguna');

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.postCounter += 1;
    $scope.allowBack = true;
    AuthService.header('postCounter', $scope.postCounter);
    PostService.index().then(function success(response) {
      $scope.posts = response.data.posts;
      $scope.postQuantity = response.data.postQuantity;
      $scope.post = {};
      $scope.newPost = {};
      if (!response.data.posts.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.postCounter) {
      $scope.postCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('postCounter', $scope.postCounter);
    PostService.index().then(function success(response) {
      $scope.posts = response.data.posts;
      $scope.postQuantity = response.data.postQuantity;
      $scope.post = {};
      $scope.newPost = {}
    });
  };

  $scope.fetchTags = function() {
    TagService.indexNames().then(function success(response) {
      $scope.tags = response.data.tags;
    });
  };
  if (AuthService.checkRoute('dashboard.editpost') || AuthService.checkRoute('dashboard.createpost')) {
    $scope.fetchTags();
  }

  $scope.fetchPosts = function() {
    $scope.postCounter = 0;
    AuthService.header('postCounter', $scope.postCounter);
    PostService.index().then(
      function success(response) {
        $scope.posts = response.data.posts;
        $scope.postQuantity = response.data.postQuantity;
        $scope.post = {};
        $scope.newPost = {}
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (!$stateParams.slug) { $scope.fetchPosts() }

  $scope.showPost = function() {
    PostService.show($stateParams.slug).then(
      function success(response) {
        $scope.post = response.data.post;
    },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('post')) { $scope.showPost() }

  $scope.storePost = function(post) {
    $scope.postCounter = 0;
    AuthService.header('postCounter', $scope.postCounter);
    PostService.store(post).then(
      function success(response) {
        $scope.posts = response.data.posts;
        $scope.postQuantity = response.data.postQuantity;
        $scope.post = {};
        $scope.newPost = {};
        AuthService.redirect('dashboard.posts');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.editPost = function() {
    PostService.edit($stateParams.slug).then(
      function success(response) {
        $scope.newPost = response.data.post;
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  if (AuthService.checkRoute('dashboard.editpost')) { $scope.editPost() }

  $scope.updatePost = function(post) {
    $scope.postCounter = 0;
    AuthService.header('postCounter', $scope.postCounter);
    PostService.update(post).then(
      function success(response) {
        $scope.posts = response.data.posts;
        $scope.postQuantity = response.data.postQuantity;
        AuthService.redirect('dashboard.posts');
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
  $scope.destroyPost = function(post) {
    $scope.postCounter = 0;
    AuthService.header('postCounter', $scope.postCounter);
    PostService.destroy(post).then(
      function success(response) {
        $scope.posts = response.data.posts;
        $scope.postQuantity = response.data.postQuantity;
        $scope.post = {};
        $scope.newPost = {};
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };
});
