app.controller("ProjectCtrl", function($scope, $rootScope, $location, ProjectFactory, CheckListFactory){


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




  let getProjects = () => {
    ProjectFactory.getProjects($rootScope.user.uid).then((results) => {
      for(x=0;x<results.length;x++){
        let date = results[x].createdOn;
        results[x].createdOn = moment(date).format('M/DD/YY h:mm:ss a');
        results[x].sortedBy = moment(date).format('YYYY/MM/DD, h:mm:ss a');
      }
      $scope.projects = results;

    }).catch((error) => {
      console.log("get proj error", error);
    });
  };

  let findCheckedData = () => {
    CheckListFactory.getCheckedData($rootScope.user.uid).then((results) => {
      // console.log(results);
      $scope.disableClass = checkForChecklist(results);
      // ctrl.versions = response.data;
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

  // findCheckedData();

  $scope.changeCheck = (project) => {
    // console.log(project.id);
    $location.url(`/checklist/${project.id}`);
  }

  getProjects();

});
