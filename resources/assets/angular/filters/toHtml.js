app.filter('toHtml', ['$sce', function($sce) {
  return function(data) {
    return $sce.trustAsHtml(data);
  };
}]);
