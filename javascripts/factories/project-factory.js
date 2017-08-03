app.factory("ProjectFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

  let addProject = (task, cellid, content, assets, creative, imageServer, jira, notes, userId) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/projects.json`, JSON.stringify({
        // POST data here
        "assets" : assets,
        "cellid" : cellid,
        "contentid" : content,
        "creativeServer" : creative,
        "imageServer" : imageServer,
        "jiraTicket" : jira,
        "notes" : notes,
        "taskName" : task,
        "uid" : $rootScope.user.uid
      }))
      .then((result) => {
        resolve(result.config.data);
      }).catch((error) => {
        reject(error);
      });
    });
  };


  let getProjects = (userId) => {
      let projects = [];
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/projects.json?orderBy="uid"&equalTo="${userId}"`)
        .then((proj) => {
          let dateCollect = proj.data;
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
    };

    let deleteProject = (id) => {
      return $q((resolve, reject) => {
        $http.delete(`${FIREBASE_CONFIG.databaseURL}/projects/${id}.json`).then((results) => {
          resolve(results);
        }).catch((error) => {
          reject(error);
        });
      });
    };


    return { getProjects:getProjects, addProject:addProject, deleteProject:deleteProject };
});
