app.factory("ProjectFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

  let addProject = (task, cellid, content, assets, creative, imageServer, jira, notes, userId, newDate) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/projects.json`, JSON.stringify({
        "assets" : assets,
        "cellid" : cellid,
        "contentid" : content,
        "creativeServer" : creative,
        "createdOn" : newDate,
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
    console.log(userId);
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

    let editProject = (id) => {
      console.log(id);
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/projects/${id}.json`)
        .then((results) => {
          // results.data.id = id;
          // console.log(results.data);
          results = results.data;
          resolve(results);
        }).catch((error) => {
          reject(error);
        });
      });
    };


    return { editProject:editProject, getProjects:getProjects, addProject:addProject, deleteProject:deleteProject };
});
