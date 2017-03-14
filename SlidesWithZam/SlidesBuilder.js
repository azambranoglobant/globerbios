//TODO: Delete this code when the Sliderifier.sliderifyGlober method gets refactored.
function SlidesBuilder() {

    this.buildContent = function(profileData, templateSlideContent) {
        // STEP1: Slide content validation.
        if (templateSlideContent == undefined || templateSlideContent.pageElements == undefined) 
            return [];
        
        // TODO: Wrong place to invoke the photo info.
        var photoFile = PhotoRepository.findPhotoByEmail(profileData.email);

        var contentChanges = [];

        for (i = 0; i < templateSlideContent.pageElements.length; i++) {
            
            var element = templateSlideContent.pageElements[i];
            
            var elementPhotoRequest = (photoFile == undefined) ? undefined : SlidesRepository.getUpdateImageRequest(templateSlideContent.objectId, element, photoFile.id);
            if(elementPhotoRequest  !== undefined) contentChanges.push(elementPhotoRequest);

            var elementTextRequest = getTextUpdateRequests(element, profileData);
            if(elementTextRequest !== undefined) contentChanges = contentChanges.concat(elementTextRequest);
        }

        return contentChanges;
    }

    function getTextUpdateRequests(element, profileData) {

        var textRequests;
        if (element.shape != undefined && element.shape.text != undefined && element.shape.shapeType == 'TEXT_BOX') {

            for (j = 0; j < element.shape.text.textElements.length; j++) {
                var textElement = element.shape.text.textElements[j];
                if (textElement.textRun != undefined) {
                    var placeHolderText = textElement.textRun.content.trim().toUpperCase();
                    var currentRequest = undefined;
                    var startIndex = textElement, startIndex;
                    if (startIndex == undefined) 
                        startIndex = 0;
                    
                    // TODO: Understand and remove this comment: 
                    // use the parent element or the textElement?

                    switch (placeHolderText) {
                        case '[FULLNAME]':
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, profileData.fullName);
                            break;
                        case '[ROLE]':
                            var role = profileData.role;
                            var seniority = profileData.seniority;

                            var roleSeniority = role;
                            if (seniority != role) 
                                roleSeniority += '\n' + seniority;
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, roleSeniority);
                            break;
                            /*
                        case '[SENIORITY]':
                        currentRequest = getUpdateTextRequest(element, seniority);
                        break;
                        */
                        case '[TEXTDESCRIPTION]':
                        case '[ABSTRACT]':
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, profileData.description);
                            break;
                            /*
                        // Funciona pero borra el campo
                        case '[YEARSOFEXPERIENCE]':
                        var yearsOfExp = profileData.yearsOfExp;
                        currentRequest = getUpdateTextRequest(element, yearsOfExp);
                        break;
                        case '[GENERALROLE]':
                        var generalRole = profileData.generalRole;
                        currentRequest = getUpdateTextRequest(element, generalRole);
                        break;
                        */
                        case '[LANGUAGES]':
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, profileData.languages);
                            break;
                            /*
                        case '[KEYASPECTS]':
                        currentRequest = getUpdateTextRequest(element, keyAspects);
                        break;
                        */
                    }

                    // TODO: Poor error handling. Using error as an error code.
                    if (currentRequest != undefined) {
                        textRequests = (textRequests == undefined)
                            ? currentRequest
                            : textRequests.concat(currentRequest);
                    }
                }
            }
        }

        return textRequests;
    }

}