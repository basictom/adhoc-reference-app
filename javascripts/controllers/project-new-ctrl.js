app.controller("ProjectNewCtrl", function($scope, $rootScope, $location, ProjectFactory){

  $scope.addProject = () => {
    ProjectFactory.addProject($scope.newProject).then((returns) => {
    $location.url("/projects");
    }).catch((error) => {
      console.log("add proj error", error);
    });
  };

  $scope.cancelProject = () => {
    $location.url("/projects");
  }

});
