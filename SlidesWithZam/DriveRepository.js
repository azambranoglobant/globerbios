// TODO: Rename to reflect the 'GDrive API/service' style.
var DriveRepository = (function(){

    var baseUrl = 'https://www.googleapis.com/drive/v3/files/';
    
    function copyFile(sourceId, newTitle) {
        var url = baseUrl + sourceId + '/copy';
        
        var formData = "{'name': '" + newTitle + "'}";
        
        var params = {
            method : 'post',
            contentType: 'application/json',
            payload: formData,
            headers: {
            'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
            }
        };
        
      var response = UrlFetchApp.fetch(url, params);
      return JSON.parse(response);
    }

    var deleteFile = function(googleDriveFileId) {
        var url = baseUrl + googleDriveFileId;
        
        var params = {
            method : 'delete',
            headers: {
            'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
            }
        };
        
        UrlFetchApp.fetch(url, params);
    }

    return {
         copyFile: copyFile,
         deleteFile: deleteFile
    };
})();