app.factory("CommentService", function($http){
  var apiUrl = "/api/";

  var index = function(slug) {
    return $http.get(apiUrl + "posts/" + slug + "/comments");
  };
  var store = function(comment, slug) {
    return $http.post(apiUrl + "posts/" + slug + "/comments" , comment);
  };
  var destroy = function(comment, slug) {
    return $http.delete(apiUrl + "posts/" + slug + "/comments/" + comment.id);
  };

  return {
    index: index,
    store: store,
    destroy: destroy
  };
});
