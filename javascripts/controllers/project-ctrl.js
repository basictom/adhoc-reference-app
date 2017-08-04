app.controller("ProjectCtrl", function($scope, $rootScope, $location, ProjectFactory){

  console.log($rootScope.user.uid);

  $scope.projects = [];
  $scope.info = false;
  var task = $scope.taskName;
  var cellid = $scope.cellid;
  var content = $scope.content;
  var assets = $scope.assets;
  var creative = $scope.creative;
  var imageServer = $scope.imageServer;
  var jira = $scope.jira;
  var notes = $scope.notes;

  $scope.showInfo = (id) => {
    console.log("prj id", id);
    console.log("scoped id", $scope.projects);
    $scope.info = true;
  };

  $scope.addNewPage = () => {
    $location.url("/new-project");
  }

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

  $scope.addProject = () => {
    ProjectFactory.addProject(task, cellid, content, assets, creative, imageServer, jira, notes, $rootScope.user.uid, newDate).then((returns) => {
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

  $scope.cancelProject = () => {
    $location.url("/projects/:type/:uid");
  }

  $scope.editProject = (id) => {
    console.log(id);
    ProjectFactory.editProject(id).then((results) => {
      console.log(results.assets);
      $location.url("/edit-project");
      $scope.taskName = results.taskName;
      $scope.cellid = results.cellid;
      $scope.content = results.contentid;
      $scope.assets = results.assets;
      $scope.creative = results.creativeServer;
      $scope.imageServer =results.imageServer;
      $scope.jira = results.jiraTicket;
      $scope.notes =results.notes;
      // getProjects();
    }).catch((error) => {
      console.log("edit proj", error);
    })
  };

  var getProjects = () => {
    ProjectFactory.getProjects($rootScope.user.uid).then((results) => {
      $scope.projects = results;
    }).catch((error) => {
      console.log("get proj error", error);
    });
  };

  getProjects();



});
