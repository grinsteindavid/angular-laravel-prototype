app.controller("testimonialRequestController", function($scope, $stateParams, AuthService, NotifyService, TestimonialRequestService) {
  console.log("testimonialRequestController");
  $scope.testimonials = [];
  $scope.testimonialBody = '';
  $scope.testimonialRequestCounter = 0;
  $scope.testimonialQuantity = 0;
  $scope.allowNext = true;
  $scope.allowBack = false;

  // PAGER NEXT
  $scope.next = function() {
    if (!$scope.allowNext) { return }
    $scope.testimonialRequestCounter += 1;
    $scope.allowBack = true;
    AuthService.header('testimonialRequestCounter', $scope.testimonialRequestCounter);
    TestimonialRequestService.index().then(function success(response) {
      $scope.testimonials = response.data['testimonialRequests'];
      $scope.testimonialQuantity = response.data['testimonialRequestQuantity'];
      if (!response.data.testimonials.length) { $scope.allowNext = false }
    });
  };
  // PAGER BACK
  $scope.back = function() {
    if ($scope.testimonialRequestCounter) {
      $scope.testimonialRequestCounter -= 1;
      $scope.allowBack = true;
      $scope.allowNext = true;
    } else {
      $scope.allowBack = false;
      return;
    }
    AuthService.header('testimonialRequestCounter', $scope.testimonialRequestCounter);
    TestimonialRequestService.index().then(function success(response) {
      $scope.testimonials = response.data['testimonialRequests'];
        $scope.testimonialQuantity = response.data['testimonialRequestQuantity'];
    });
  };

  $scope.fetchTestimonials = function() {
    $scope.testimonialRequestCounter = 0;
    AuthService.header('testimonialRequestCounter', $scope.testimonialRequestCounter);
    TestimonialRequestService.index().then(
      function success(response) {
        $scope.testimonials = response.data['testimonialRequests'];
        $scope.testimonialQuantity = response.data['testimonialRequestQuantity'];
      },
      function fail(response) {
        $scope.debug = response.data;
      }
    );
  };
  $scope.fetchTestimonials();

  $scope.storeTestimonial = function(testimonial) {
    $scope.testimonialRequestCounter = 0;
    AuthService.header('testimonialRequestCounter', $scope.testimonialRequestCounter);
    TestimonialRequestService.store(testimonial).then(
      function success(response) {
        $scope.testimonials = response.data['testimonialRequests'];
        $scope.testimonialQuantity = response.data['testimonialRequestQuantity'];
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };

  $scope.destroyTestimonial = function(testimonial) {
    $scope.testimonialRequestCounter = 0;
    AuthService.header('testimonialRequestCounter', $scope.testimonialRequestCounter);
    TestimonialRequestService.destroy(testimonial).then(
      function success(response) {
        $scope.testimonials = response.data['testimonialRequests'];
        $scope.testimonialQuantity = response.data['testimonialRequestQuantity'];
      },
      function fail(response) {
        $scope.debug = response.data;
        NotifyService.send('Notificacion del sistema', 'Los datos proporcionados son incorrectos.');
      }
    );
  };

  $scope.setTestimonial = function(testimonial) {
    $scope.testimonialBody = testimonial.body;
  };
});
