app.directive("slickCarouselPosts", function() {
  return {
    restrict : "E",
    controller: 'postController',
    templateUrl : '/angular/directives/slickCarousel/Posts.html'
  };
});
