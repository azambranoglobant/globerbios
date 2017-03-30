//TODO: Rename to reflect the 'request generator' purpose.
function ProfilePhotoUpdater(slideContent) {
    
    var oauthToken = 'DUMMY_TOKEN';
    if((typeof ScriptApp !== 'undefined') && (typeof ScriptApp.getOAuthToken !== 'undefined')) {
        oauthToken = ScriptApp.getOAuthToken();
    }

    this.generate = function(photoFile) {

        if(photoFile == undefined) return undefined;

        for (i = 0; i < slideContent.pageElements.length; i++) {
            var element = slideContent.pageElements[i];
            var updateRequest = getUpdateImageRequest(slideContent.objectId, element, photoFile.id);

            if(updateRequest !== undefined) {
                return updateRequest;
            }
        }
    }

    var getUpdateImageRequest = function (slideId, element, googleDriveFileId) {

        if (element === undefined || element.image === undefined || element.title !== '[FOTOGLOBER]') {
            return undefined; //TODO: throw new Error('Invalid element');
        }

        var imageUrl = 'https://www.googleapis.com/drive/v3/files/' + googleDriveFileId + '?alt=media&access_token=' + oauthToken;
        var photoRequests = [
            {
                'createImage': {
                    'url': imageUrl,
                    'elementProperties': {
                        'pageObjectId': slideId,
                        'size': element.size,
                        'transform': element.transform
                    }
                }
            }, {
                'deleteObject': {
                    'objectId': element.objectId
                }
            }
        ];

        return photoRequests;
    }
}

module.exports = ProfilePhotoUpdater;