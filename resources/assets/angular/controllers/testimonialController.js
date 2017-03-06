app.controller("testimonialController", function($scope, $stateParams, AuthService, NotifyService, TestimonialService) {
  console.log("testimonialController"); // DEBUGG
  $scope.newTestimonial = {};
  $scope.testimonials = [];
  $scope.testimonialCounter = 0;
  $scope.busy = false;
  $scope.busyIcon = true;

  $scope.fetchTestimonials = function() {
    $scope.busyIcon = true;
    $scope.busy = true;
    AuthService.header('testimonialCounter', $scope.testimonialCounter);
    TestimonialService.index($stateParams.slug).then(
      function success(response) {
        $scope.newTestimonial = {};
        $scope.testimonialCounter += 1;
        // Push new testimonials
        $.each(response.data.testimonials, function(index, val) {
          $scope.testimonials.push(val);
        });
        $scope.busy = false;
        $scope.busyIcon = false;
        $scope.notFound = false;
      },
      function fail(response) {
        $scope.debug = response.data;
        $scope.busy = true;
        $scope.busyIcon = false;
      }
    );
  };

  $scope.storeTestimonial = function(testimonial) {
    $scope.testimonialCounter = 0;
    AuthService.header('testimonialCounter', $scope.testimonialCounter);
    TestimonialService.store(testimonial, $stateParams.slug).then(
      function success(response) {
        $scope.testimonials = response.data.testimonials;
        $scope.newTestimonial = {};
        NotifyService.send('Anuncio del sistema', 'El testimonio sera revisado por un administrador antes de su publicacion.')
      },
      function fail(response) {
        NotifyService.send('Anuncio del sistema', 'Los datos enviados son incorrectos.')
        $scope.debug = response.data;
      }
    );
  };

  $scope.destroyTestimonial = function(testimonial) {
    $scope.testimonialCounter = 0;
    AuthService.header('testimonialCounter', $scope.testimonialCounter);
    TestimonialService.destroy(testimonial, $stateParams.slug).then(
      function success(response) {
        $scope.testimonials = response.data.testimonials;
        $scope.newTestimonial = {};
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
});
