let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    // console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    var logged = AuthFactory.isAuthenticated();
    var appTo;
    if (currRoute.originalPath) {
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});

app.config(function($routeProvider){
  $routeProvider
  .when("/auth", {
    templateUrl: "partials/auth.html",
    controller: "AuthCtrl"
  })
  .when("/projects", {
    templateUrl: "partials/project-view.html",
    controller: "ProjectCtrl",
    resolve: {isAuth}
  })
  .when("/new-project", {
    templateUrl: "partials/project-new.html",
    controller: "ProjectNewCtrl",
    resolve: {isAuth}
  })
  .when("/edit-project/:id", {
    templateUrl: "partials/project-edit.html",
    controller: "ProjectEditCtrl",
    resolve: {isAuth}
  })
  .when("/checklist/:id", {
    templateUrl: "partials/project-checklist",
    controller: "ProjectChecklist as ctrl",
    resolve: {isAuth}
  })
  .otherwise("/auth");
});
