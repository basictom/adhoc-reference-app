app.controller("ManagerProjectsCtrl", function(ManagerFactory, $scope, $location, $rootScope, $routeParams ){


  $scope.userProject = [];
  $scope.test = "test string";

  $scope.name = $routeParams.firstName;
  let userUid = $routeParams.id;

  let getUserProjects = (id) => {
    ManagerFactory.getProjects(id).then((returns) => {
      $scope.userProjects = returns;
    }).catch((error) => {
      console.log("get user projects error", error);
    });
  };

  getUserProjects(userUid);


});
