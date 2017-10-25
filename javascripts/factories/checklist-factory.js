app.factory("CheckListFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

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
        let rownum = listItems[i]["Rownum not in joins"];
        let redirects = listItems[i]["No redirected links"];
        let detectTags = listItems[i]["Open Detect tags not included in source"];
        let placeholder = listItems[i]["If links were not provided, use: (placeholder image)"];
        let formAction = listItems[i]["Form action is formatted correctly for redirection"];
        let formVariable = listItems[i]["Form Variable hidden inputs are not hard coded"];
        let boxes = listItems[i]["No boxes or strange charcaters"];
        let spellCheck = listItems[i]["Spell check subject lines"];
        let report = listItems[i]["Report names correct per ASF"];
        let links = listItems[i]["All inks reported on, unless otherwise requested"];
        let postal = listItems[i]["Postal Address visible"];
        let naming = listItems[i]["Consistent Naming - reportnames, images, image folders"];
        let breaks = listItems[i]["No breaks in table structure"];
        let brokenImages = listItems[i]["No broken/missing images"];
        let spaces = listItems[i]["No spaces in image names"];
        let fonts = listItems[i]["No inconsistent/unusual fonts"];
        let securePayPal = listItems[i]["All links are secure - PayPal only"];
        let hostPayPAl = listItems[i]["Secure hosted link used - PayPal only"];
        let altTags = listItems[i]["Alt tags updated per ASF or content"];
        let imagesAbsolute = listItems[i]["images absolutely referenced"];
        let outlook2013 = listItems[i]["Outlook 2013 Rendering: Add style to 'td' cells under 20px in height --> Style='font-size:0; line-height:0';"];
        let title = listItems[i]["Update <title> of the build for hosted link"];
        let psdMatch = listItems[i]["make sure all content matches PSD: alignment, padding, font sizes, colors, etc"];
        let specialChar = listItems[i]["No special characters"];
        let textHTML = listItems[i]["Text is representative of HTML"];
        let mergeError = listItems[i]["No Merger errors"];
        let audiences = listItems[i]["Correct audiences receive correct creative"];
        let hostedLink = listItems[i]["Hosted link is functional"];
        let forwardFunc = listItems[i]["f2f is functional"];
        let forwardUnsub = listItems[i]["F2F and Unsub links removed on forwarded versions"];
        let unsub = listItems[i]["unsub resolves to proper landing page"];
        let workingRedirects = listItems[i]["redirects working"];
        let dynamic = listItems[i]["dynamic elements published as instructed"];
        let jiraTasks = listItems[i]["All requests in Jira task complete"];
        let oneUpLayout = listItems[i]["One-up layout matches build/spec"];
        let forms = listItems[i]["Forms are functional and redirected"];
        let litmus = listItems[i]["Send and verify rendering through Litmus"];
        let responsive = listItems[i]["Responsive version is checked"];
        $http.post(`${FIREBASE_CONFIG.databaseURL}/projects/${id}/checklist.json`, JSON.stringify({
          "Grid" : grid,
          "ASF" : asf,
          "PSD" : psd,
          "HTML" : html,
          "IMAGES" : images,
          "TEXT" : text,
          "CELLID" : cellId,
          "ROWNUM" : rownum,
          "REDIRECTS": redirects,
          "DETECTAGS" : detectTags,
          "PLACEHOLDER" : placeholder,
          "FORMACTION" : formAction,
          "FORMVARIABLE" : formVariable,
          "BOXES" : boxes,
          "SPELLCHECK" : spellCheck,
          "REPORT" : report,
          "LINKS" : links,
          "POSTAL" : postal,
          "NAMING" : naming,
          "BREAKS" : breaks,
          "BROKENIMAGES" : brokenImages,
          "SPACES" : spaces,
          "FONTS" : fonts,
          "SECUREPAYPAL" : securePayPal,
          "HOSTPAYPAL" : hostPayPAl,
          "ALTTAGS" : altTags,
          "IMAGEABSOLUTE" :imagesAbsolute,
          "OUTLOOK2013" : outlook2013,
          "TITLE" : title,
          "PSDMATCH" : psdMatch,
          "SPECIALCHAR" : specialChar,
          "TEXTHTML" : textHTML,
          "MERGEERROR" : mergeError,
          "AUDIENCES" : audiences,
          "HOSTEDLINK" : hostedLink,
          "FORWARDFUNC" : forwardFunc,
          "FORWARDUNSUB" : forwardUnsub,
          "UNSUB" : unsub,
          "WORKINGREDIRECTS" : workingRedirects,
          "DYNAMIC" : dynamic,
          "JIRATASKS" : jiraTasks,
          "ONEUPLAYOUT" : oneUpLayout,
          "FORMS" : forms,
          "LITMUS" : litmus,
          "RESPONSIVE" : responsive
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


  let getCheckedData = (projId) => {
    let checklist = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/projects/${projId}/checklist.json`).then((result) => {
        let dataCollect = result.data;
          if(dataCollect !== null){
            Object.keys(dataCollect).forEach((key) => {
              // dataCollect[key].id = key;
              checklist.push(dataCollect[key]);
            });
          }
          console.log(checklist);
          resolve(checklist);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  return { postChecklist:postChecklist, getCheckedData:getCheckedData }
});
