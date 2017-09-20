app.controller("ProjectChecklist", function($scope, $rootScope, $routeParams, $location, ProjectFactory, CheckListFactory){
  let projectId = $routeParams.id;
  let ctrl = this;

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



  let findCheckedData = (id) => {
    console.log(id);
    CheckListFactory.getCheckedData(id).then((response) => {
      console.log(response);
      ctrl.versions = response.data;
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

  // findCheckedData(projectId);

  $scope.submitChecklist = () => {
    CheckListFactory.postChecklist(this.userResponse(), projectId).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

});
