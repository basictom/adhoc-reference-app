app.controller("ProjectChecklist", function($scope, $rootScope, $location, ProjectFactory){

  $(document).ready(function(){
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-purple'
    });
  });

  $scope.assetsObject = [
    {
    question: "Blah Blah Blah",
    cb1: true,
    cb2: false,
    cb3: false,
    cb4: false,
    cb5: false
  },
  {
    question: "YA YA YA YA",
    cb1: false,
    cb2: true,
    cb3: false,
    cb4: false,
    cb5: false
  },
  {
    question: "OH OHO OHO",
    cb1: false,
    cb2: false,
    cb3: false,
    cb4: false,
    cb5: false
  }
];
$scope.checkedItems = () => {
    var checkItems = [];
    angular.forEach($scope.assetsObject, function(objs, arrayIndex){
        angular.forEach(objs, function(cb, key) {
          console.log(cb);
          console.log(key);
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
