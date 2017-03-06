app.directive("tooltip", function() {
  return {
    restrict : "A",
    link: function(scope, iElement, iAttrs) {
      iElement.tooltip();
    }
  };
});
