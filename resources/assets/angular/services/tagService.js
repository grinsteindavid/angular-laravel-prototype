app.factory("TagService", function($http){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "tags");
  };
  var indexNames = function() {
    return $http.get(apiUrl + "tags-names");
  };
  var show = function(slug) {
    return $http.get(apiUrl + "tags/" + slug);
  };
  var store = function(tag) {
    return $http.post(apiUrl + "tags", tag);
  };
  var update = function(tag) {
    return $http.put(apiUrl + "tags/" + tag.slug, tag);
  };
  var destroy = function(tag) {
    return $http.delete(apiUrl + "tags/" + tag.slug);
  };

  return {
    index: index,
    indexNames: indexNames,
    show: show,
    store: store,
    update: update,
    destroy: destroy
  };
});
