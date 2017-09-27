app.controller("ManagerChecklistCtrl", function(CheckListFactory, $scope, $location, $rootScope, $routeParams ){

  this.fields = [
    "PSD - Copied to the Server",
    "HTML",
    "Text",
    "Images",
    "Cell Id",
    "ASF / Marketing Plan / PID File",
    "Grid",
  ];

  $scope.projectChecklist = [];

  $scope.name = $routeParams.taskName;
  let projectId = $routeParams.id;

  let findCheckedData = (id) => {
    CheckListFactory.getCheckedData(id).then((response) => {
      $scope.projectChecklist = indexByAttr(response);
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

  findCheckedData(projectId);

  let indexByAttr = (coll) => {
    return coll.reduce(function(result, item){
      angular.forEach(item, function(value, index) {
        result[index] = result[index] || [];
        result[index].push(value);
      });
      return result;
    }, {});
  }

  $scope.addedBgColor = (val) => {
    if(val == true){
      return "green-bg";
    }else if(val == false){
      return "red-bg";
    }else{};
  };

});
