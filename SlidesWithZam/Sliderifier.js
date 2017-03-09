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
    }

    this.sliderifyTeam = function() {

        var profiles = [{id: 1, fullName: 'Alan Zambrano', description: 'Developer', role: 'Web UI', seniority: 'SSr', languages: 'C#', email: 'alan.zambrano@globant.com'}, 
                        {id: 2, fullName: 'Lucia Echenique', description: 'Developer', role: 'Web UI', seniority: 'SSr', languages: 'Java', email: 'lucia.echenique@globant.com'}, 
                        {id: 3, fullName: 'Bruno Guardia', description: 'Tech Director', role: 'Tech Director', seniority: 'Level5', languages: '.NET', email: 'bruno.guardia@globant.com'}];

        // Step 1: Prepare new Presentation.
        var presentationFileInfo = DriveRepository.copyFile(this.sliderifyConfig.presentationTemplateId, this.sliderifyConfig.presentationTitle);
        var presentation = SlidesRepository.getPresentation(presentationFileInfo.id);
        var slideToDuplicateId = presentation.slides[1].objectId;

        for(i = profiles.length - 1; i >= 0; i--) {
            var duplicationResponse = SlidesRepository.duplicateSlide(presentationFileInfo.id, slideToDuplicateId);
            profiles[i].objectId = duplicationResponse.replies[0].duplicateObject.objectId;
        }

        SlidesRepository.sendSlideRequest(presentationFileInfo.id, [{deleteObject: { objectId: slideToDuplicateId }}] );

        // Step 2: Prepare team slide.
        var teamSlideContent = SlidesRepository.getSlide(presentationFileInfo.id, presentation.slides[0].objectId);
        var textUpdater = new TextUpdater(teamSlideContent);
        var textChangesForTeamSlide = [];
        textChangesForTeamSlide.push(textUpdater.generateRequest('[TEAM NAME]', 'AGILE POD'));
        textChangesForTeamSlide.push(textUpdater.generateRequest('[PRESENTATION DATE]', 'March 2017'));

        SlidesRepository.sendSlideRequest(presentationFileInfo.id, textChangesForTeamSlide);

        for(var i = 0; i < profiles.length; i++) {
             // Step 3: Get Slide content.
            var templateSlideContent = SlidesRepository.getSlide(presentationFileInfo.id, profiles[i].objectId);
            var contentChanges = this.builder.buildContent(profiles[i], templateSlideContent);

            // Step 4: Apply content Changes to the slide.
            SlidesRepository.sendSlideRequest(presentationFileInfo.id, contentChanges);
        }
    }
}