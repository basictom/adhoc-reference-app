app.factory("CheckListFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

  let postChecklist = (listItems, id) => {
    return $q((resolve, reject) => {
      console.log(id);
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
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  let getCheckedData = (id) => {
    console.log("inside factory", id);
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/projects/${id}/checklist.json`).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  return { postChecklist:postChecklist, getCheckedData:getCheckedData }
});
