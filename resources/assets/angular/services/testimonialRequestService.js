app.factory("TestimonialRequestService", function($http){
  var apiUrl = "/api/";

  var index = function() {
    return $http.get(apiUrl + "testimonials-requests/");
  };
  var store = function(testimonial) {
    return $http.post(apiUrl + "testimonials-requests/" , testimonial);
  };
  var destroy = function(testimonial) {
    return $http.delete(apiUrl + "testimonials-requests/" + testimonial.id);
  };

  return {
    index: index,
    store: store,
    destroy: destroy
  };
});
