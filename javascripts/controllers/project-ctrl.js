app.controller("ProjectCtrl", function($scope, $rootScope, $location, ProjectFactory){

  $scope.projects = [];
  var task = $scope.taskName;
  var cellid = $scope.cellId;
  var content = $scope.contentId;

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
    ProjectFactory.addProject(task, cellid, content, assets, creative, imageServer, jira, notes).then((returns) => {
      console.log(returns);
    }).catch((error) => {
      console.log("add proj error", error);
    });
  };

  var getProjects = () => {
    ProjectFactory.getProjects().then((results) => {
      $scope.projects = results;
    }).catch((error) => {
      console.log("get proj error", error);
    })
  }

  getProjects();

  function getTimeStamp() {
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

});
