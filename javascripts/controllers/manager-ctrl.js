app.controller("ManagerCtrl", function(ManagerFactory, $scope, $location, $rootScope, $routeParams ){


  $scope.userProject = [];
  $scope.test = "test string";

  let users = [];
  let userFirstName;

  let getUsers = () => {
    ManagerFactory.getAllUsers().then((users) => {
      userFirstName = users.firstName;
      $scope.users = users;
    }).catch((error) => {
      console.log("get users error", error);
    });
  };

  getUsers();

});
