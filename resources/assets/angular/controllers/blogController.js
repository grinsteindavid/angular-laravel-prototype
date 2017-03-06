app.controller("blogController", function($scope, AuthService, NotifyService, PostService, TagService) {
  console.log("blogController"); // DEBUGG
  $scope.choice_tag = {name: 'Ninguna'};
  $scope.posts = [];
  $scope.postCounter = 0;
  $scope.busy = false;
  $scope.busyIcon = true;

  $scope.fetchPosts = function() {
    $scope.busyIcon = true;
    $scope.busy = true;
    AuthService.header('choice_tag', $scope.choice_tag.name);
    AuthService.header('postCounter', $scope.postCounter);
    PostService.index().then(
      function success(response) {
        $scope.postCounter += 1;
        // Push new posts
        $.each(response.data.posts, function(index, val) {
          $scope.posts.push(val);
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

  $scope.cleanPosts = function() {
    $scope.posts = [];
    $scope.postCounter = 0;
    $scope.busyIcon = true;
    $scope.busy = true;
    AuthService.header('choice_tag', $scope.choice_tag.name);
    AuthService.header('postCounter', $scope.postCounter);
    PostService.index().then(
      function success(response) {
        $scope.postCounter += 1;
        // Push new posts
        $.each(response.data.posts, function(index, val) {
          $scope.posts.push(val);
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

  $scope.fetchTags = function() {
    TagService.index().then(function success(response) {
      $scope.tags = response.data.tags;
    });
  };
  $scope.fetchTags();

  $scope.changeTag = function(tagName) {
    $scope.choice_tag = {name: tagName};
    $scope.cleanPosts();
  };
});
