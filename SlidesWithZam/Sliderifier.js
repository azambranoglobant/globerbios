function Sliderifier(sliderifyConfig) {
    this.sliderifyConfig = sliderifyConfig;

    this.builder = new SlidesBuilder();

    this.sliderifyGlober = function(profileData) {
        // Step 1: Prepare new Presentation.
        var presentationFileInfo = DriveRepository.copyFile(this.sliderifyConfig.presentationTemplateId, this.sliderifyConfig.presentationTitle);
        var presentation = SlidesRepository.getPresentation(presentationFileInfo.id);

        // Step 2: Create content for the profileSlide.
        var profileSlide = this.sliderifyConfig.getProfileSlide(presentation); 
        var templateSlideContent = SlidesRepository.getSlide(this.sliderifyConfig.presentationTemplateId, profileSlide.objectId);
        var contentChanges = this.builder.buildContent(profileData, templateSlideContent);

        // Step 3: Apply content Changes to the prepared presentation.
        SlidesRepository.sendSlideRequest(presentationFileInfo.id, contentChanges);

        return presentationFileInfo.id;
    }

    var mergeTeamAndGlobantProfile = function(team) {
        var spreadSheetRepo = new SpreadsheetRepository({id: '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY', 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 1});

        var globantProfileMetadata = {
            id: 0,
            email: 1,
            career: 2,
            programming: 3,
            jsFrameworks: 4,
            databases: 5,
            mvcFrameworkds: 6,
            presentation: 7,
            mobile: 8,
            bigData: 9,
            testing: 10,
            other: 11,
            tools: 12,
            english: 13,
            spanish: 15,
            portuguese: 16,
            otherlanguages: 17
        };

        var reloadedProfiles = [];

        for(i = 0; i < team.length; i++) {
            var globerProfile = spreadSheetRepo.getDataByEmail(globantProfileMetadata, team[i].email);
            var mergedProfile = merge(team[i], globerProfile);

            reloadedProfiles.push(mergedProfile);
        }

        return reloadedProfiles;
    }

    this.sliderifyTeam = function(teamBiosData) {

        // Step 1: Load Profile information.
        var profiles = mergeTeamAndGlobantProfile(teamBiosData.team);

        // Step 2: Prepare new Presentation.
        var presentationFileInfo = DriveRepository.copyFile(this.sliderifyConfig.presentationTemplateId, this.sliderifyConfig.presentationTitle);
        var presentation = SlidesRepository.getPresentation(presentationFileInfo.id);
        var slideToDuplicateId = presentation.slides[1].objectId;

        for(i = profiles.length - 1; i >= 0; i--) {
            var duplicationResponse = SlidesRepository.duplicateSlide(presentationFileInfo.id, slideToDuplicateId);
            profiles[i].objectId = duplicationResponse.replies[0].duplicateObject.objectId;
        }

        SlidesRepository.sendSlideRequest(presentationFileInfo.id, [{deleteObject: { objectId: slideToDuplicateId }}] );

        // Step 3: Prepare team slide.
        var coverMetadata = [{placeholder: '[TEAM NAME]', replacement: teamBiosData.teamName}, 
                            {placeholder: '[PRESENTATION DATE]', replacement: teamBiosData.date}];
        var teamSlideContent = SlidesRepository.getSlide(presentationFileInfo.id, presentation.slides[0].objectId);
        var textUpdater = new TextUpdater(teamSlideContent);
        var textChangesForTeamSlide = textUpdater.generate(coverMetadata);
        
        SlidesRepository.sendSlideRequest(presentationFileInfo.id, textChangesForTeamSlide);

        // Step 4: Prepare team members slides.
        for(var i = 0; i < profiles.length; i++) {
             // Step 4.1: Get Slide content.
            var templateSlideContent = SlidesRepository.getSlide(presentationFileInfo.id, profiles[i].objectId);
            
            var profileMetaData = [{placeholder: '[FULLNAME]', replacement: profiles[i].fullName}, 
                                {placeholder: '[ROLE]', replacement: profiles[i].teamRole},
                                {placeholder: '[TECH]', replacement: profiles[i].role},
                                {placeholder: '[ABSTRACT]', replacement: profiles[i].career},
                                {placeholder: '[KEYASPECTS]', replacement: getKeyAspectsText(profiles[i])}];

            var textUpdater = new TextUpdater(templateSlideContent);
            var contentChanges = textUpdater.generate(profileMetaData);
            
            // Step 4.2 Create photo update request
            var photoFile = PhotoRepository.findPhotoByEmail(profiles[i].email);
            var photoUpdater = new ProfilePhotoUpdater(templateSlideContent);
            var photoUpdateRequest = photoUpdater.generate(photoFile);

            if(photoUpdateRequest !== null) contentChanges.push(photoUpdateRequest);

            // Step 4.3: Apply content Changes to the slide.
            SlidesRepository.sendSlideRequest(presentationFileInfo.id, contentChanges);
        }

        return presentationFileInfo.id;
    }

    var getKeyAspectsText = function(profile){
        
        var keyAspectsText = '';
        
        var profileLanguages = [
            {title: 'English', level: profile.english}, 
            {title: 'Spanish', level: profile.spanish},
            {title: 'Portuguese', level: profile.portuguese},
            {title: 'Other', level: profile.otherlanguages}
            ];

        keyAspectsText = getLanguagesText(profileLanguages);

        var keyAspects = [
            {title: 'Programming languages: ', aspect: profile.programming},
            {title: 'Javascript Frameworks: ', aspect: profile.jsFrameworks},
            {title: 'Databases: ', aspect: profile.databases},
            {title: 'MVC Frameworks: ', aspect: profile.mvcFrameworkds},          
            {title: 'Presentation Layers: ', aspect: profile.presentation},          
            {title: 'Mobile Development: ', aspect: profile.mobile},          
            {title: 'Big Data Tools: ', aspect: profile.bigData},     
            {title: 'Testing Tools: ', aspect: profile.testing},          
            {title: 'Other Technologies:', aspect: profile.other},      
            {title: 'Tools: ', aspect: profile.tools},            
        ];

        for(var i = 0; i < keyAspects.length; i++){
            var aspect = keyAspects[i].aspect;
            var title = keyAspects[i].title;
            
            if(aspect != undefined && aspect != ''){
                keyAspectsText += '\n' + title + aspect;
            }
        }
        
        return keyAspectsText;
    }

    var getLanguagesText = function(profileLanguages) {
        var languages = '';

        for(var i=0; i < profileLanguages.length; i++) {
            var currentLanguage = profileLanguages[i].level;
            var languageTitle = profileLanguages[i].title;
            
            if(currentLanguage != undefined && currentLanguage != '' && currentLanguage != 'N/A'){
                
                if(languages.length > 0 ){
                    languages += ',';
                }

                languages += languageTitle + ' (' + currentLanguage + ')';
            }
        }

        return languages;
    }
}