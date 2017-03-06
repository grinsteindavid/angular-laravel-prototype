app.factory("ToolService", function($http, Upload){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "tools");
  };
  var store = function(tool) {
    return Upload.upload({
      url: apiUrl + "tools",
      method: 'POST',
      data: tool,
    });
  };
  var update = function(tool) {
    return Upload.upload({
      url: apiUrl + "tools/" + tool.slug,
      method: 'POST',
      data: tool,
    });
  };
  var edit = function(slug) {
    return $http.get(apiUrl + "tools/" + slug + "/edit");
  };
  var destroy = function(tool) {
    return $http.delete(apiUrl + "tools/" + tool.slug);
  };

  return {
    index: index,
    store: store,
    edit: edit,
    update: update,
    destroy: destroy
  };
});
