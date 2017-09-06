app.controller("ProjectChecklist", function($scope, $rootScope, $location, ProjectFactory){


  // $scope.questionsArray = [
  //       "PSD - Copied to the Server",
  //       "HTML",
  //       "Text",
  //       "Images",
  //       "Cell Id",
  //       "ASF / Marketing Plan / PID File",
  //       "Grid"
  // ];


  var ctrl = this;

  this.fields = [
    "PSD - Copied to the Server",
    "HTML",
    "Text",
    "Images",
    "Cell Id",
    "ASF / Marketing Plan / PID File",
    "Grid",
  ];

  this.versions = [{}];

	// This function really just fills in the blanks
  this.formatForApi = function() {
		return this.versions
      .map(function(version) {
        return ctrl.fields.reduce(function(out, field) {
        	out[field] = !!version[field];
        	return out;
        }, {});
      });
  };

  let userOutput = ctrl.formatForApi();

  $scope.submitChecklist = () => {
    console.log(userOutput);
  };




  // $scope.checkboxArray = [];
  // let key = $scope.checkboxArray;
  // let obj = [];
  // $scope.count = 0;
  // $scope.addNewCheckbox = () => {
  //   $scope.versionBtn = true;
  //   let newKey = $scope.count++;
  //   let pushKey = "cb" + newKey;
  //   console.log(pushKey);
  //   obj[pushKey] = false;
  //   key.push(obj);
  //   console.log(obj);
  // };
  //
  // $scope.onCbChange = (cb, id) => {
  //   console.log("changinggg, index.", cb);
  //   console.log("changinggg, id.", id);
  // };





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
