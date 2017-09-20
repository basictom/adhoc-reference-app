app.factory("ManagerFactory", function($q, $http, FIREBASE_CONFIG){


  let getProjects = (id) => {
    let projects = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/projects.json?orderBy="uid"&equalTo="${id}"`).then((result) => {
        let dateCollect = result.data;
          if(dateCollect !== null){
            Object.keys(dateCollect).forEach((key) => {
              dateCollect[key].id=key;
              projects.push(dateCollect[key]);
            });
          }
          resolve(projects);
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
