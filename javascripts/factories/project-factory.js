app.factory("ProjectFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

  let getTimeStamp = () => {
      const now = new Date();
      return ((now.getMonth() + 1) + '/' +
              (now.getDate()) + '/' +
               now.getFullYear() + " " +
               now.getHours() + ':' +
               ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + ':' +
               ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())));
  }

  let newDate = getTimeStamp();

  let addProject = (p) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/projects.json`, JSON.stringify({
        "assets" : p.assets,
        "cellid" : p.cellid,
        "contentid" : p.content,
        "creativeServer" : p.creative,
        "createdOn" : newDate,
        "imageServer" : p.imageServer,
        "jiraTicket" : p.jira,
        "notes" : p.notes,
        "taskName" : p.taskName,
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

    let editSingleProject = (id) => {
      return $q((resolve, reject) => {
        $http.get(`${FIREBASE_CONFIG.databaseURL}/projects/${id}.json`)
        .then((results) => {
          resolve(results);
        }).catch((error) => {
          reject(error);
        });
      });
    };

    let editProject = (p, id) => {
      return $q((resolve, reject) => {
        $http.put(`${FIREBASE_CONFIG.databaseURL}/projects/${id}.json`, JSON.stringify({
          "assets" : p.assets,
          "cellid" : p.cellid,
          "contentid" : p.contentid,
          "createdOn" : newDate,
          "creativeServer" : p.creativeServer,
          "imageServer" : p.imageServer,
          "jiraTicket" : p.jiraTicket,
          "notes" : p.notes,
          "taskName" : p.taskName,
          "uid" : $rootScope.user.uid
        }))
        .then((results) => {
          resolve(results);
        }).catch((error) => {
          console.log("factory edit error", error);
        });
      });
    };


    return { editProject:editProject, editSingleProject:editSingleProject, getProjects:getProjects, addProject:addProject, deleteProject:deleteProject };
});
