app.controller("ProjectChecklist", function($scope, $rootScope, $routeParams, $location, ProjectFactory, CheckListFactory){

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
    CheckListFactory.postChecklist(this.userResponse(), $routeParams.id).then((response) => {
      // console.log()
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

});
