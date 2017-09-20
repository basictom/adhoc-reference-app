app.controller("ManagerChecklistCtrl", function(CheckListFactory, $scope, $location, $rootScope, $routeParams ){

console.log("hitting manager checklist controller");

  // $scope.userProject = [];
  // $scope.test = "test string";

  $scope.projectChecklist = [];

  //
  $scope.name = $routeParams.taskName;
  let projectId = $routeParams.id;

  let findCheckedData = (id) => {
    console.log(id);
    CheckListFactory.getCheckedData(id).then((response) => {
      console.log(response);
      $scope.projectChecklist = response;
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

  findCheckedData(projectId);



});
