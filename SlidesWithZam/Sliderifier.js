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
            tools: 12
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
                                {placeholder: '[KEYASPECTS]', replacement: profiles[i].tools}];

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
}