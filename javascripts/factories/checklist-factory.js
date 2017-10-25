app.factory("CheckListFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

  // let postChecklist = (listItems, id) => {
  //   return $q((resolve, reject) => {
  //     for(i=0;i<listItems.length;i++){
  //       let asf = listItems[i]["ASF / Marketing Plan / PID File"];
  //       let grid = listItems[i].Grid;
  //       let psd = listItems[i]["PSD - Copied to the Server"];
  //       let html = listItems[i].HTML;
  //       let images = listItems[i].Images;
  //       let text = listItems[i].Text;
  //       let cellId = listItems[i]["Cell Id"];
  //       $http.post(`${FIREBASE_CONFIG.databaseURL}/checklists.json`, JSON.stringify({
  //         "active" : true,
  //         "uid" : $rootScope.user.uid,
  //         "projectId" : id,
  //         "Grid" : grid,
  //         "ASF" : asf,
  //         "PSD" : psd,
  //         "HTML" : html,
  //         "IMAGES" : images,
  //         "TEXT" : text,
  //         "CELLID" : cellId
  //       }))
  //       .then((result) => {
  //         // console.log(result.data.name);
  //         markTrue(id);
  //         resolve(result);
  //       }).catch((error) => {
  //         reject(error);
  //       });
  //     }
  //   });
  // }


  let postChecklist = (listItems, id) => {
    return $q((resolve, reject) => {
      for(i=0;i<listItems.length;i++){
        let asf = listItems[i]["ASF / Marketing Plan / PID File"];
        let grid = listItems[i].Grid;
        let psd = listItems[i]["PSD - Copied to the Server"];
        let html = listItems[i].HTML;
        let images = listItems[i].Images;
        let text = listItems[i].Text;
        let cellId = listItems[i]["Cell Id"];
        $http.post(`${FIREBASE_CONFIG.databaseURL}/projects/${id}/checklist.json`, JSON.stringify({
          "Grid" : grid,
          "ASF" : asf,
          "PSD" : psd,
          "HTML" : html,
          "IMAGES" : images,
          "TEXT" : text,
          "CELLID" : cellId
        }))
        .then((result) => {
          console.log(result);
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

 let markTrue = (projectId) => {
   return $q((resolve, reject) => {
     $http.put(`${FIREBASE_CONFIG.databaseURL}/projects/${projectId}.json`, JSON.stringify({
       "checklist" : true
     }))
     .then((result) => {
       resolve(result.config.data);
     }).catch((error) => {
       reject(error);
     });
   });
 }


  let getCheckedData = (userId) => {
    let checklist = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/checklists.json?orderBy="uid"&equalTo="${userId}"`).then((result) => {
        let dataCollect = result.data;
          if(dataCollect !== null){
            Object.keys(dataCollect).forEach((key) => {
              dataCollect[key].id = key;
              checklist.push(dataCollect[key]);
            });
          }
          resolve(checklist);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  return { postChecklist:postChecklist, getCheckedData:getCheckedData }
});
