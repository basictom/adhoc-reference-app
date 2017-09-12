app.controller("ProjectChecklist", function($scope, $rootScope, $location, ProjectFactory){

  var ctrl = this;

  this.fields = [
    "PSD - Copied to the Server",
    "HTML",
    "Text",
    "Images",
    "Cell Id",
    "ASF / Marketing Plan / PID File",
    "Grid",
  ];

  this.versions = [{}];

  this.userResponse = function() {
		return this.versions
      .map(function(version) {
        return ctrl.fields.reduce(function(out, field) {
        	out[field] = !!version[field];
        	return out;
        }, {});
      });
  };

  $scope.submitChecklist = () => {
    console.log(this.userResponse());
  };

});
