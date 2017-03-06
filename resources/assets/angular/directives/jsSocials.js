app.directive("jsSocials", function() {
  return {
    restrict : "A",
    link: function(scope, iElement, iAttrs) {
      var shares = iAttrs.jsSocialsShares.split(', ');
      iElement.jsSocials({
        shares: shares,
        shareIn: "popup",
        showLabel: true,
        showCount: false
      });
    }
  };
});
