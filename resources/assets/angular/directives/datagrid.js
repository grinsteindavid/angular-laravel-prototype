app.directive("datagrid", function() {
  return {
    restrict : "E",
    controller: 'peopleController',
    templateUrl : 'angular/directives/datagrid.html'
  };
});

app.directive("datagridControl", function() {
  return {
    restrict : "A",
    link: function(scope, iElement, iAttrs) {
      scope.editRow = function() {
        var row = iElement.parent().parent();
        var spans = row.find('span');
        var inputs = row.find('input');
        var buttonEdit = row.find('button').first();
        var buttonConfirm = buttonEdit.next();

        buttonEdit.toggleClass('hidden');
        buttonConfirm.toggleClass('hidden');
        spans.toggleClass('hidden');
        inputs.toggleClass('hidden');
      };
    }
  };
});
