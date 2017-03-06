app.factory("ChatRequestService", function($http, $rootScope, AuthService, NotifyService){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "chat-requests");
  };
  var store = function(request) {
    return $http.post(apiUrl + "chat-requests", request);
  };
  var destroy = function(request) {
    return $http.delete(apiUrl + "chat-requests/" + request.id);
  };
  var acceptRequest = function(request) {
    return $http.put(apiUrl + "chat-requests/" + request.id + "/accept", request);
  };

  return {
    index: index,
    store: store,
    destroy: destroy,
    acceptRequest: acceptRequest
  };
});
