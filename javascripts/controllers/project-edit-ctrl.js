app.controller("ProjectEditCtrl", function($scope, $routeParams, $rootScope, $location, ProjectFactory){

  $scope.projectId = $routeParams.id;
  $scope.edit = {};

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
    ProjectFactory.editProject($scope.edit, $scope.projectId).then((results) =>{
      $location.url("/projects");
    }).catch((error) => {
      console.log("edit error", error);
    })
  }

});
