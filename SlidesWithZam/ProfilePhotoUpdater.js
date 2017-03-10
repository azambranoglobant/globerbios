function ProfilePhotoUpdater(slideContent) {
    this.generate = function(photoFile) {

        if(photoFile == undefined) return null;

        for (i = 0; i < slideContent.pageElements.length; i++) {
            var element = slideContent.pageElements[i];
            var updateRequest = SlidesRepository.getUpdateImageRequest(slideContent.objectId, element, photoFile.id);

            if(updateRequest !== undefined){
                return updateRequest;
            }
        }

        return null;
    }
}