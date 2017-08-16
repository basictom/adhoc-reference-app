app.controller("ProjectNewCtrl", function($scope, $rootScope, $location, ProjectFactory){
  var getTimeStamp = () => {
      var now = new Date();
      return ((now.getMonth() + 1) + '/' +
              (now.getDate()) + '/' +
               now.getFullYear() + " " +
               now.getHours() + ':' +
               ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' +
               ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())));
  }

  var newDate = getTimeStamp();

  $scope.addProject = () => {
    console.log($scope.newProject);
    ProjectFactory.addProject($scope.newProject, newDate).then((returns) => {
    $location.url("/projects");
    }).catch((error) => {
      console.log("add proj error", error);
    });
  };

  $scope.cancelProject = () => {
    $location.url("/projects");
  }

});
