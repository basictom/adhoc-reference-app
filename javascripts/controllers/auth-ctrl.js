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
        console.log(user);
        if(user.email == "resola@zetaglobal.com"){
          console.log("rachel's logged in");
          $location.url("/manager");
        }else{
          console.log("other user's logged in");
          $location.url("/projects");
        }

      });
    }, (error) => {
      $scope.alerts.push({msg: error.message});
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
