app.controller("ProjectChecklist", function($scope, $rootScope, $location, ProjectFactory){

  $(document).ready(function(){
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-purple'
    });
  });

  $scope.questionsArray = [
        "Blah Blah Blah",
        "XXX CXXX XCXC",
        "QUESTION 3"
  ];

  $scope.checkboxArray = [];
  let key = $scope.checkboxArray;
  let obj = [];
  $scope.count = 0;
  $scope.addNewCheckbox = () => {
    console.log("scoped value", $scope.$index);
    let newKey = $scope.count++;
    let pushKey = "cb" + newKey;
    obj[pushKey] = false;
    key.push(obj);
    console.log(key);
  };

  $scope.onChange = (value) => {
    console.log("change value", value);
  }


  $scope.checkedItems = () => {
      var checkItems = [];
      angular.forEach($scope.assetsObject, function(objs, arrayIndex){
          angular.forEach(objs, function(cb, key) {
              if(key.substring(0, 2) == "cb" && cb) {
                  checkItems.push(objs.question + '-' + key)
              }
          })
      })
      return checkItems
  }



  // $scope.submitChecklist = () => {
  //   console.log($scope.oneAssets);
  // }


});
