app.factory("ProjectFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

  let addProject = (p) => {
    let date = new Date();
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/projects.json`, JSON.stringify({
        "assets" : p.assets,
        "cellid" : p.cellid,
        "contentid" : p.content,
        "checklist" : false,
        "creativeServer" : p.creative,
        "createdOn" : date,
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
      if(confirm("Are you sure you want to delete this AWESOME project?")){
        return $q((resolve, reject) => {
          $http.delete(`${FIREBASE_CONFIG.databaseURL}/projects/${id}.json`).then((results) => {
            resolve(results);
          }).catch((error) => {
            reject(error);
          });
        });
      }else{}
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
      // updateTimeStamp();
      let update = moment().format('M/DD/YY h:mm:ss a');
      return $q((resolve, reject) => {
        $http.put(`${FIREBASE_CONFIG.databaseURL}/projects/${id}.json`, JSON.stringify({
          "assets" : p.assets,
          "cellid" : p.cellid,
          "contentid" : p.contentid,
          "creativeServer" : p.creativeServer,
          "createdOn" : p.createdOn,
          "updatedOn" : update,
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
