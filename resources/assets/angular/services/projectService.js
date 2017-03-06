app.factory("ProjectService", function($http, Upload){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "projects");
  };
  var indexNames = function() {
    return $http.get(apiUrl + "projects-names");
  };
  var show = function(slug) {
    return $http.get(apiUrl + "projects/" + slug);
  };
  var store = function(project) {
    return Upload.upload({
      url: apiUrl + "projects",
      method: 'POST',
      data: project,
    });
  };
  var edit = function(slug) {
    return $http.get(apiUrl + "projects/" + slug + "/edit");
  };
  var update = function(project) {
    return Upload.upload({
      url: apiUrl + "projects/" + project.slug,
      method: 'POST',
      data: project,
    });
  };
  var destroy = function(project) {
    return $http.delete(apiUrl + "projects/" + project.slug);
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
