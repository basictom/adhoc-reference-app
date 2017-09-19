app.factory("ManagerFactory", function($q, $http, FIREBASE_CONFIG){


  let getProjects = (id) => {
    console.log(id);
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/projects.json?orderBy="uid"&equalTo="${id}"`).then((result) => {
        console.log(result.data);
        // resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  let getAllUsers = () => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json`).then((result) => {
        users = result.data;
        resolve(users);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return { getAllUsers:getAllUsers, getProjects:getProjects }
});
