app.controller("ManagerCtrl", function(ManagerFactory, $scope ){

  // let getChecklists = (id) => {
  //   console.log(id);
  //   CheckListFactory.getCheckedData(id).then((response) => {
  //     console.log(response);
  //     ctrl.versions = response.data;
  //   }).catch((error) => {
  //     console.log("checklist error", error);
  //   })
  // };

  $scope.users = [];

  let getUsers = () => {
    ManagerFactory.getAllUsers().then((users) => {
      $scope.users = users;
    }).catch((error) => {
      console.log("get users error", error);
    });
  };

  getUsers();

  $scope.getUserProjects = (id) => {
    ManagerFactory.getProjects(id).then((projects) => {
      console.log(projects);
    }).catch((error) => {
      console.log("get user projects error", error);
    });
  };



});
