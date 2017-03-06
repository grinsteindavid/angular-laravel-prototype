app.factory("ContactService", function($http){
  var apiUrl = "/api/";

  var store = function(form) {
    return $http.post(apiUrl + "contact", form);
  };

  return {
    store: store
  };
});
