var app = angular.module("AdhocApp", ["ngRoute", 'angular-loading-bar', "ngAnimate"])
    // Angular Loading Bar configuration. Turning off default spinner and poisitioning loading bar
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);
