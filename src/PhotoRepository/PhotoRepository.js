// TODO: Rename to reflect the 'Photo directory API/service' style.
function PhotoRepository(DriveService) {

    var PHOTO_FOLDER_ID = '0B5Pvk3zKcgb0bnM1UjA1M2ZvdzQ';

    if(DriveService === undefined && (typeof DriveApp !== 'undefined')) {
        DriveService = DriveApp;
    }

    function loadPhotos() {

        var photoFolder = DriveService.getFolderById(PHOTO_FOLDER_ID);
        var photos = photoFolder.getFiles();
        var photoArray = [];
        while (photos.hasNext()) {
            var rowData = photos.next();
            var fileId = rowData.getId();
            var filename = rowData.getName();
            var photoURL = rowData.getUrl();
            photoArray.push({"id": fileId, "name": filename, "photoURL": photoURL});
        }

        return photoArray;
    }

    this.findPhotoByEmail = function(email) {
        var photoData = loadPhotos();
        var nameBase = email
            .replace('@globant.com', '')
            .toLowerCase();

        for (i = 0; i < photoData.length; i++) {
            var rowData = photoData[i];
            var filename = rowData.name.toLowerCase();
            if (filename.indexOf(nameBase) > -1) {
                return rowData;
            }
        }

        return undefined;
    }
};

if((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = PhotoRepository;
}