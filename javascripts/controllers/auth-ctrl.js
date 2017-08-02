// var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
//
// console.log(timeStampInMs, Date.now());


app.controller("AuthCtrl", function($location, $rootScope, $scope, AuthFactory, UserFactory){

  $scope.auth = {
    email: "tfitzgerald@zetaglobal.com",
    password: "123456"
  };

  let logMeIn = () => {
    AuthFactory.authenticate($scope.auth).then((userCreds) => {
      return UserFactory.getUser(userCreds.uid);
    }, (error) => {
      $scope.alerts.push({msg: error.message});
    }).then((user) => {
      if(user){
        console.log("what the fuck");
        AuthFactory.persistence();
      }else{
        console.log("error with persistence");
      };
      $rootScope.user = user;
      $location.url(`/projects/${user.type}/${user.uid}`);
    }).catch((error) => {
      console.log("getUser error", error);
    });
  };


  // var user = firebase.auth().currentUser;






  $scope.registerUser = () => {
    console.log("register with user");
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
