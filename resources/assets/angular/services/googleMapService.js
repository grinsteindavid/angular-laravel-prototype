app.factory("GoogleMapService", function($http){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get();
  };
  var store = function() {
    return $http.post();
  };
  var destroy = function() {
    return $http.delete();
  };

  return {
    index: index,
    store: store,
    destroy: destroy
  };
});
