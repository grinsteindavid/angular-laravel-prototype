app.directive("datepicker", function() {
  return {
    restrict : "A",
    link: function(scope, iElement, iAttrs) {
      iElement.datepicker({ dateFormat: 'dd-mm-yy' });
    }
  };
});
