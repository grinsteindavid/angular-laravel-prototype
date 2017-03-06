app.factory("CategoryService", function($http){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "categories");
  };
  var indexNames = function() {
    return $http.get(apiUrl + "categories-names");
  };
  var show = function(slug) {
    return $http.get(apiUrl + "categories/" + slug);
  };
  var store = function(category) {
    return $http.post(apiUrl + "categories", category);
  };
  var update = function(category) {
    return $http.put(apiUrl + "categories/" + category.slug, category);
  };
  var destroy = function(category) {
    return $http.delete(apiUrl + "categories/" + category.slug);
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
