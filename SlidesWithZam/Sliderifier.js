var Sliderifier = (function () {

    //TODO: Refactor as parameter.
    var TEMPLATE_PRESENTATION_ID = '1b6vvDjqakVt32e3W0RGYA6lvByTAImy8-fAmbnX3d8Y';

    var sliderifyGlober = function (profileData) {
        // Step1 get the globers photo.
        // TODO: Is this ok as step 1?
        var globerPhoto = PhotoRepository.findPhotoByEmail(profileData.email);

        // Step2 Create the actual presentation based on the template.
        var newPresentation = DriveRepository.copyFile(TEMPLATE_PRESENTATION_ID, 'Bios-' + profileData.fullName);

        // Step3 Load the presentation in memory.
        // TODO: Rename newSlide to presentation. Current newPresentation should be
        // 'duplicatedPresentationInfo'.
        var newSlide = SlidesRepository.getPresentation(newPresentation.id);

        // Step4 Build all the slide requests.
        // TODO: This should be moved to the SlideBuilder.
        var requests = buildSlideRequests(globerPhoto, newSlide.slides[0].objectId, profileData);

        // Step5 Apply changes to the presentation file.
        SlidesRepository.sendSlideRequest(newPresentation.id, requests);
    }

    function buildSlideRequests(photoFile, slideId, profileData) {
        var photoRequestsdataBios,
            textRequestsdataBios;

        //TODO: Wrong place to extract variables. Should go deeper.
        var fullName = profileData.fullName;
        var description = profileData.description;
        var role = profileData.role;
        var seniority = profileData.seniority;
        var yearsOfExp = profileData.yearsOfExp;
        var generalRole = profileData.generalRole;
        var languages = profileData.languages;
        var tools = profileData.tools;

        var slideContent = SlidesRepository.getSlide(TEMPLATE_PRESENTATION_ID, slideId);

        //TODO: Poor error handling. Using error as an error code.
        if (slideContent == undefined || slideContent.pageElements == undefined) 
            return undefined;
        
        for (i = 0; i < slideContent.pageElements.length; i++) {
            var element = slideContent.pageElements[i];
            var title = element.title;

            var thisElementPhotoRequest = (photoFile == undefined)
                ? undefined
                : SlidesRepository.getUpdateImageRequest(slideId, element, photoFile.id);

            var thisElementTextRequest = getTextUpdateRequests(element, fullName, role, seniority, description, yearsOfExp, generalRole, languages, tools);
            textRequestsdataBios = (textRequestsdataBios == undefined)
                ? thisElementTextRequest
                : textRequestsdataBios.concat(thisElementTextRequest);
            photoRequestsdataBios = (photoRequestsdataBios == undefined)
                ? thisElementPhotoRequest
                : photoRequestsdataBios.concat(thisElementPhotoRequest);
        }

        return {
            requests: (photoRequestsdataBios == undefined)
                ? textRequestsdataBios
                : photoRequestsdataBios.concat(textRequestsdataBios)
        };
    }

    function getTextUpdateRequests(element, fullName, role, seniority, description, yearsOfExp, generalRole, languages, tools) {
        var textRequests;
        if (element.shape != undefined && element.shape.text != undefined && element.shape.shapeType == 'TEXT_BOX') {

            for (j = 0; j < element.shape.text.textElements.length; j++) {
                var textElement = element.shape.text.textElements[j];
                if (textElement.textRun != undefined) {
                    var variable = textElement
                        .textRun
                        .content
                        .trim()
                        .toUpperCase();
                    var currentRequest = undefined;
                    var startIndex = textElement,
                        startIndex;
                    if (startIndex == undefined) 
                        startIndex = 0;
                    
                    //TODO: Understand and remove this comment: 
                    // use the parent element or the textElement?

                    switch (variable) {
                        case '[FULLNAME]':
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, fullName);
                            break;
                        case '[ROLE]':
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
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, description);
                            break;
                            /*
                        // Funciona pero borra el campo
                        case '[YEARSOFEXPERIENCE]':
                        currentRequest = getUpdateTextRequest(element, yearsOfExp);
                        break;
                        case '[GENERALROLE]':
                        currentRequest = getUpdateTextRequest(element, generalRole);
                        break;
                        */
                        case '[LANGUAGES]':
                            currentRequest = SlidesRepository.getUpdateTextRequest(element, languages);
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

    return {
        sliderifyGlober: sliderifyGlober
    };
})();