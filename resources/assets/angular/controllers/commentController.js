app.controller("commentController", function($scope, $stateParams, AuthService, NotifyService, CommentService) {
  console.log("commentController"); // DEBUGG
  $scope.newComment = {};
  $scope.comments = [];
  $scope.replyComment = {};
  $scope.blockquote = {};
  $scope.commentCounter = 0;
  $scope.busy = false;
  $scope.busyIcon = true;

  $scope.fetchComments = function() {
    $scope.busyIcon = true;
    $scope.busy = true;
    AuthService.header('commentCounter', $scope.commentCounter);
    CommentService.index($stateParams.slug).then(
      function success(response) {
        $scope.newComment = {};
        $scope.commentCounter += 1;
        // Push new comments
        $.each(response.data.comments, function(index, val) {
          $scope.comments.push(val);
        });
        $scope.busy = false;
        $scope.busyIcon = false;
        $scope.notFound = false;
      },
      function fail(response) {
        $scope.debug = response.data;
        $scope.busy = true;
        $scope.busyIcon = false;
      }
    );
  };

  $scope.storeComment = function(comment) {
    $scope.commentCounter = 0;
    AuthService.header('commentCounter', $scope.commentCounter);
    CommentService.store(comment, $stateParams.slug).then(
      function success(response) {
        $scope.comments = response.data.comments;
        $scope.newComment = {};
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };

  $scope.destroyComment = function(comment) {
    $scope.commentCounter = 0;
    AuthService.header('commentCounter', $scope.commentCounter);
    CommentService.destroy(comment, $stateParams.slug).then(
      function success(response) {
        $scope.comments = response.data.comments;
        $scope.newComment = {};
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };

  $scope.storeReply = function(comment) {
    comment.reply_id = $scope.blockquote.id;
    $scope.commentCounter = 0;
    AuthService.header('commentCounter', $scope.commentCounter);
    CommentService.store(comment, $stateParams.slug).then(
      function success(response) {
        $scope.comments = response.data.comments;
        $scope.newComment = {};
        $scope.cleanReply();
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };

  $scope.setReply = function(comment) {
    $scope.blockquote = comment;
  };

  $scope.cleanReply = function() {
    $scope.blockquote = {};
    $scope.replyComment = {};
  };
});
