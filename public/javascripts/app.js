var app = angular.module("AdhocApp", ["ngRoute", 'angular-loading-bar', "ngAnimate"])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);
