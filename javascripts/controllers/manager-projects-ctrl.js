app.controller("ManagerProjectsCtrl", function(ManagerFactory, $scope, $location, $rootScope, $routeParams ){


  $scope.userProject = [];
  $scope.test = "test string";

  $scope.name = $routeParams.firstName;
  let userUid = $routeParams.id;

  let getUserProjects = (id) => {
    ManagerFactory.getProjects(id).then((returns) => {
      for(x=0;x<returns.length;x++){
        let date = returns[x].createdOn;
        returns[x].createdOn = moment(date).format('M/DD/YY h:mm:ss a');
        returns[x].sortedBy = moment(date).format('YYYY/MM/DD, h:mm:ss a');
      }
      $scope.userProjects = returns;
    }).catch((error) => {
      console.log("get user projects error", error);
    });
  };

  getUserProjects(userUid);


});
