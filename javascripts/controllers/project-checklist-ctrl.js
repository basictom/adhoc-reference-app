app.controller("ProjectChecklist", function($scope, $rootScope, $location, ProjectFactory){

  $(document).ready(function(){
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-purple'
    });
  });

  $scope.questionsArray = [
        "PSD - Copied to the Server",
        "HTML",
        "Text",
        "Images",
        "Cell Id",
        "ASF / Marketing Plan / PID File",
        "Grid"
  ];

  $scope.checkboxArray = [];
  let key = $scope.checkboxArray;
  let obj = [];
  $scope.count = 0;
  $scope.addNewCheckbox = () => {
    $scope.versionBtn = true;
    let newKey = $scope.count++;
    // if(newKey === 11){
    //   $scope.versionBtn = false;
    // }
    let pushKey = "cb" + newKey;
    obj[pushKey] = false;
    key.push(obj);
    console.log(obj);
  };

  $scope.onCbChange = (cb, id) => {
    console.log("changinggg, index.", cb);
    console.log("changinggg, id.", id);
  };


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
