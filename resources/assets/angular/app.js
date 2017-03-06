// Angular - Plugins
require('./plugins/angular-locale_es-es');
//require('./plugins/textAngular-rangy.js');
require('./plugins/textAngular-sanitize.min');
require('./plugins/textAngular.min');
//require('angular-cookies');
require('angular-ui-router');
require('ng-infinite-scroll');
require('angular-validation');
require('./angular-validation-rule');
require('./plugins/ng-file-upload-all.min');
require('pusher-angular');
require('angularjs-scroll-glue');
require('ngmap');
require('ng-combo-date-picker');
require('angular-slick-carousel');
require('./plugins/angular-chosen.min');
// Angular - Modules
window.app = angular.module("main", [
  'ui.router',
  'validation',
  'validation.rule',
  'ngSanitize',
  'textAngular',
  'infinite-scroll',
  'angular.chosen',
  'ngFileUpload',
  'pusher-angular',
  'ngMap',
  'luegg.directives',
  'ngComboDatePicker',
  'slickCarousel'
]);
require('./directives');
require('./routes');
require('./controllers');
require('./services');
require('./filters');
