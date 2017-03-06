app.directive("datagridCategories", function() {
  return {
    restrict : "E",
    controller: 'categoryController',
    templateUrl : '/angular/directives/dashboard/datagrid_categories.html'
  };
});
