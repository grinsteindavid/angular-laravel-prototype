app.factory("PostService", function($http){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "posts");
  };
  var show = function(slug) {
    return $http.get(apiUrl + "posts/" + slug);
  };
  var store = function(post) {
    return $http.post(apiUrl + "posts", post);
  };
  var edit = function(slug) {
    return $http.get(apiUrl + "posts/" + slug + "/edit");
  };
  var update = function(post) {
    return $http.put(apiUrl + "posts/" + post.slug, post);
  };
  var destroy = function(post) {
    return $http.delete(apiUrl + "posts/" + post.slug);
  };

  return {
    index: index,
    show: show,
    store: store,
    edit: edit,
    update: update,
    destroy: destroy
  };
});
