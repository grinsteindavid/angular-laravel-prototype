app.factory("AnnounceService", function($http, Upload){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "announces");
  };
  var store = function(announce) {
    return Upload.upload({
      url: apiUrl + "announces",
      method: 'POST',
      data: announce,
    });
  };
  var update = function(announce) {
    return Upload.upload({
      url: apiUrl + "announces/" + announce.slug,
      method: 'POST',
      data: announce,
    });
  };
  var edit = function(slug) {
    return $http.get(apiUrl + "announces/" + slug + "/edit");
  };
  var destroy = function(announce) {
    return $http.delete(apiUrl + "announces/" + announce.slug);
  };

  return {
    index: index,
    store: store,
    edit: edit,
    update: update,
    destroy: destroy
  };
});
