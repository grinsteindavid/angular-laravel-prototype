app.factory("ProfileService", function($http, Upload){
  var apiUrl = "/api/";

  var show = function() {
    return $http.get(apiUrl + "profile");
  };
  var update = function(profile) {
    return Upload.upload({
      url: apiUrl + "profile/",
      method: 'POST',
      data: profile,
    });
  };

  return {
    show: show,
    update: update
  };
});
