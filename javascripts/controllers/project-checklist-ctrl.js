app.controller("ProjectChecklist", function($scope, $rootScope, $routeParams, $location, ProjectFactory, CheckListFactory){
  let projectId = $routeParams.id;
  let ctrl = this;

  this.fields = [
    "PSD - Copied to the Server",
    "HTML",
    "Text",
    "Images",
    "Cell Id",
    "ASF / Marketing Plan / PID File",
    "Grid",
    // "Rownum not in joins",
    // "No redirected links",
    // "Open detect tags not included in source code",
    // "If links were not provided, use: (placeholder image)",
    // "Form action is formatted correctly for redirection",
    // "Form Variable hidden inputs are not hard coded",
    // "No boxes or strange characters",
    // "Spell check subject lines",
    // "Report names correct per ASF",
    // "All links reported on, unless otherwise requested",
    // "Postal address visible",
    // "Consistent Naming - reportnames, images, image folders",
    // "No breaks in table structure",
    // "No broken/missing images",
    // "No spaces in image names",
    // "No inconsistent/unusual fonts",
    // "All links are secure - PayPal only",
    // "Secure hosted link used - PayPal only",
    // "Alt tags updated per ASF or content",
    // "images absolutely referenced",
    // "Outlook 2013 Rendering: Add style to 'td' cells under 20px in height --> Style='font-size:0; line-height:0';",
    // "Update <title> of the build for hosted link",
    // "make sure all content matches PSD: alignment, padding, font sizes, colors, etc",
    // "No special characters",
    // "Text is representative of HTML",
    // "No Merger errors",
    // "Correct audiences receive correct creative",
    // "Hosted link is functional",
    // "f2f is functional",
    // "F2F and Unsub links removed on forwarded versions",
    // "unsub resolves to proper landing page",
    // "redirects working",
    // "dynamic elements published as instructed",
    // "All requests in Jira task complete",
    // "One-up layout matches build/spec",
    // "Forms are functional and redirected",
    // "Send and verify rendering through Litmus",
    // "Responsive version is checked"
  ];

  this.versions = [{}];

  this.userResponse = function() {
		return this.versions
      .map(function(version) {
        return ctrl.fields.reduce(function(out, field) {
        	out[field] = !!version[field];
        	return out;
        }, {});
      });
  };



  let findCheckedData = (id) => {
    console.log(id);
    CheckListFactory.getCheckedData(id).then((response) => {
      ctrl.versions = response.data;
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

  // findCheckedData(projectId);

  $scope.submitChecklist = () => {
    CheckListFactory.postChecklist(this.userResponse(), projectId).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log("checklist error", error);
    })
  };

});
