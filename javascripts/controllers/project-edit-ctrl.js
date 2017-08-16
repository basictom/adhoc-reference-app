app.controller("ProjectEditCtrl", function($scope, $routeParams, $rootScope, $location, ProjectFactory){

  $scope.projectId = $routeParams.id;
  $scope.edit = {};

  console.log("editing proj", $scope.projectId);

  let editSingleProject = () => {
    ProjectFactory.editSingleProject($scope.projectId).then((results) => {
      $scope.edit = results.data;
      $location.url(`/edit-project/${$scope.projectId}`);
    }).catch((error) => {
      console.log("edit proj", error);
    })
  };

  editSingleProject();

  $scope.editProject = () => {
    console.log("clicking into edit project");
    console.log($scope.edit);
    ProjectFactory.editProject($scope.edit, $scope.projectId).then((results) =>{
      console.log(results.data);
      $location.url("/projects");
    }).catch((error) => {
      console.log("edit error", error);
    })
  }

});
