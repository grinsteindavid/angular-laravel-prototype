app.directive("slickCarouselControl", function() {
  return {
    restrict : "A",
    link: function(scope, iElement, iAttrs) {

      var centerResponsiveConfig = [
        {
          breakpoint: 920,
          settings: {
            centerMode: true,
            centerPadding: '20px',
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: false,
            centerPadding: '0px',
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          }
        }
      ];

      var type = {
        center: function() {
          iElement.slick({
            dots: true,
            arrows: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 3,
            slidesToScroll: 3,
            mobileFirst: true,
            adaptiveHeight: true,
            responsive: centerResponsiveConfig
          });
        },
        single: function() {
          iElement.slick({
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            mobileFirst: true
          });
        },
        singleFade: function() {
          iElement.slick({
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3500,
            mobileFirst: true,
            speed: 500,
            fade: true,
            cssEase: 'linear'
          });
        },
        fade: function() {
          iElement.slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            mobileFirst: true,
            cssEase: 'linear'
          });
        },
        asNavFor: function() {
          iElement.children().eq(0).slick({
            dots: false,
            arrows: false,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            asNavFor: '.slider-nav'
          });
          iElement.children().eq(1).slick({
            dots: true,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            autoplay: true,
            autoplaySpeed: 3500
          });
        },
        vertical: function() {
          iElement.slick({
            vertical: true,
            verticalSwiping: true,
            adaptiveHeight: true,
            mobileFirst: true,
            autoplay: true,
            autoplaySpeed: 4000,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            arrows: false
          });
        }
      };

      type[iAttrs.slickType]();
    }
  };
});
