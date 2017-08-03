app.controller("ProjectCtrl", function($scope, $rootScope, $location, ProjectFactory){

  $scope.projects = [];
  $scope.info = false;

  $scope.showInfo = (id) => {
    console.log("prj id", id);
    console.log("scoped id", $scope.projects);
    $scope.info = true;
  };

  $scope.addNewPage = () => {
    $location.url("/new-project");
  }

  $scope.addProject = () => {
    var task = $scope.taskName;
    var cellid = $scope.cellid;
    var content = $scope.content;
    var assets = $scope.assets;
    var creative = $scope.creative;
    var imageServer = $scope.imageServer;
    var jira = $scope.jira;
    var notes = $scope.notes;
    ProjectFactory.addProject(task, cellid, content, assets, creative, imageServer, jira, notes, $rootScope.user.uid).then((returns) => {
    $location.url("/projects/:type/:uid");
    }).catch((error) => {
      console.log("add proj error", error);
    });
  };

  $scope.deleteProject = (id) => {
    console.log("clicking delete", id);
    ProjectFactory.deleteProject(id).then((results) => {
      getProjects();
    }).catch((error) => {
      console.log("delete project error", error);
    });
  };

  var getProjects = () => {
    ProjectFactory.getProjects($rootScope.user.uid).then((results) => {
      $scope.projects = results;
    }).catch((error) => {
      console.log("get proj error", error);
    });
  };

  getProjects();

  var getTimeStamp = () => {
      var now = new Date();
      return ((now.getMonth() + 1) + '/' +
              (now.getDate()) + '/' +
               now.getFullYear() + " " +
               now.getHours() + ':' +
               ((now.getMinutes() < 10)
                   ? ("0" + now.getMinutes())
                   : (now.getMinutes())) + ':' +
               ((now.getSeconds() < 10)
                   ? ("0" + now.getSeconds())
                   : (now.getSeconds())));
  }

  var newDate = getTimeStamp();
  // console.log(newDate);

});
