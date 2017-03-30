// TODO: Rename to reflect the 'GDrive API/service' style.
function DriveRepository(FetchingService) {

    var baseUrl = 'https://www.googleapis.com/drive/v3/files/';
    
    var oauthToken = 'DUMMY_TOKEN';
    if((typeof ScriptApp !== 'undefined') && (typeof ScriptApp.getOAuthToken !== 'undefined')) {
        oauthToken = ScriptApp.getOAuthToken();
    }

    if(FetchingService === undefined && (typeof UrlFetchApp !== 'undefined')) {
        FetchingService = UrlFetchApp;
    }

    this.copyFile = function (sourceId, newTitle) {
        var url = baseUrl + sourceId + '/copy';
        
        var formData = {name: newTitle};
        
        var params = {
            method : 'post',
            contentType: 'application/json',
            payload: formData,
            headers: {
            'Authorization': 'Bearer ' + oauthToken
            }
        };
        
      var response = FetchingService.fetch(url, params);
      return JSON.parse(response);
    }

    this.deleteFile = function(googleDriveFileId) {
        var url = baseUrl + googleDriveFileId;
        
        var params = {
            method : 'delete',
            headers: {
            'Authorization': 'Bearer ' + oauthToken
            }
        };
        
        return FetchingService.fetch(url, params);
    }
};

if((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = DriveRepository;
}