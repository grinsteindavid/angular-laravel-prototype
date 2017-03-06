app.factory("TestimonialService", function($http){
  var apiUrl = "/api/";

  var index = function(slug) {
    return $http.get(apiUrl + "solutions/" + slug + "/testimonials");
  };
  var store = function(testimonial, slug) {
    return $http.post(apiUrl + "solutions/" + slug + "/testimonials" , testimonial);
  };
  var destroy = function(testimonial, slug) {
    return $http.delete(apiUrl + "solutions/" + slug + "/testimonials/" + testimonial.id);
  };

  return {
    index: index,
    store: store,
    destroy: destroy
  };
});
