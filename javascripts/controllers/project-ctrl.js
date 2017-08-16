app.controller("ProjectCtrl", function($scope, $rootScope, $location, ProjectFactory){

 console.log('user id', $rootScope.user.uid);

  $scope.projects = [];
  $scope.info = false;

  $scope.newProject = {};

  $scope.addNewPage = () => {
    $location.url("/new-project");
  }

  $scope.deleteProject = (id) => {
    console.log("clicking delete", id);
    ProjectFactory.deleteProject(id).then((results) => {
      getProjects();
    }).catch((error) => {
      console.log("delete project error", error);
    });
  };



  $scope.editProject = (id) => {
    console.log(id);
    ProjectFactory.editProject(id).then((results) => {
      console.log(results.assets);
      $location.url("/edit-project");
    }).catch((error) => {
      console.log("edit proj", error);
    })
  };

  var getProjects = () => {
    ProjectFactory.getProjects($rootScope.user.uid).then((results) => {
      console.log("proj results", results);
      $scope.projects = results;
    }).catch((error) => {
      console.log("get proj error", error);
    });
  };

  getProjects();



});
