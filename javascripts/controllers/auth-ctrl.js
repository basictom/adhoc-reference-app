app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory){

  $scope.auth = {
    email: "tfitzgerald@zetaglobal.com",
    password: "123456"
  };

  $scope.alerts = [];

  if($location.path() === '/logout'){
  AuthFactory.logout();
  $rootScope.user = {};
  $location.url('/auth');
  }


  let logMeIn = () => {
    AuthFactory.authenticate($scope.auth).then((userCreds) => {
      return UserFactory.getUser(userCreds.uid).then((user) => {
        $rootScope.user = user;
        if(user.email == "resola@zetaglobal.com"){
          $location.url("/manager");
        }else{
          $location.url("/projects");
        }

      });
    }, (error) => {
      let message = error.message + " You may also have the incorrect credentials. Please check and try again.";
      $scope.alerts.push({msg: message});
      $scope.auth = {};
      console.log("authenticate error", error);
      $location.url("/auth");
    }).catch((error) => {
      console.log("getUser error", error);
    });
  };


  $scope.registerUser = () => {
    AuthFactory.registerWithEmail($scope.auth).then((didRegister) =>{
      $scope.auth.uid = didRegister.uid;
      return UserFactory.addUser($scope.auth);
    }, (error) => {
      console.log("registerWithEmail error", error);
    })
    .then((registerComplete) => {
      logMeIn();
    }).catch((error) => {
      console.log("addUser error", error);
    });
  };

  $scope.loginUser = () => {
    logMeIn();
  };


});
