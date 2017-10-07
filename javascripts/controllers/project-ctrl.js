app.controller("ProjectCtrl", function($scope, $rootScope, $location, ProjectFactory){


  $scope.projects = [];
  $scope.info = false;

  $scope.name = $rootScope.user.firstName;

  $scope.newProject = {};

  $scope.addNewPage = () => {
    $location.url("/new-project");
  }

  $scope.editPage = () => {
    $location.url("/edit-project");
  }

  $scope.deleteProject = (id) => {
    ProjectFactory.deleteProject(id).then((results) => {
      getProjects();
    }).catch((error) => {
      console.log("delete project error", error);
    });
  };

  let confirmation = () => {

  }

  let getProjects = () => {
    ProjectFactory.getProjects($rootScope.user.uid).then((results) => {
      for(x=0;x<results.length;x++){
        let date = results[x].createdOn;
        console.log(moment(date).format('YYYY/MM/DD, h:mm:ss a'));
        results[x].createdOn = moment(date).format('YYYY/MM/DD, h:mm:ss a');
      }
      $scope.projects = results;
    }).catch((error) => {
      console.log("get proj error", error);
    });
  };

  getProjects();



});
