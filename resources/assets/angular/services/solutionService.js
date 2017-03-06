app.factory("SolutionService", function($http, Upload){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "solutions");
  };
  var indexNames = function() {
    return $http.get(apiUrl + "solutions-names");
  };
  var show = function(slug) {
    return $http.get(apiUrl + "solutions/" + slug);
  };
  var store = function(solution) {
    return Upload.upload({
      url: apiUrl + "solutions",
      method: 'POST',
      data: solution,
    });
  };
  var edit = function(slug) {
    return $http.get(apiUrl + "solutions/" + slug + "/edit");
  };
  var update = function(solution) {
    return Upload.upload({
      url: apiUrl + "solutions/" + solution.slug,
      method: 'POST',
      data: solution,
    });
  };
  var destroy = function(solution) {
    return $http.delete(apiUrl + "solutions/" + solution.slug);
  };

  return {
    index: index,
    indexNames: indexNames,
    show: show,
    store: store,
    edit: edit,
    update: update,
    destroy: destroy
  };
});
