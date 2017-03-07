function Sliderifier(sliderifyConfig) {
    this.sliderifyConfig = sliderifyConfig;

    this.sliderifyConfig = {
        presentationTemplateId: '1b6vvDjqakVt32e3W0RGYA6lvByTAImy8-fAmbnX3d8Y',
        presentationTitle: 'Bios for Alan Zambrano',
        getProfileSlide: function(presentation) {
            return presentation.slides[0];
        }
    }

    this.builder = new SlidesBuilder();

    this.sliderifyGlober = function(profileData) {
        // Step 1: Prepare new Presentation.
        var presentationFileInfo = DriveRepository.copyFile(this.sliderifyConfig.presentationTemplateId, this.sliderifyConfig.presentationTitle);
        var presentation = SlidesRepository.getPresentation(presentationFileInfo.id);

        // Step 2: Create content for the profileSlide.
        var profileSlide = this.sliderifyConfig.getProfileSlide(presentation); 
        var templateSlideContent = SlidesRepository.getSlide(templatePresentationId, profileSlide.objectId);
        var contentChanges = this.builder.buildContent(profileData, templateSlideContent);

        // Step 3: Apply content Changes to the prepared presentation.
        SlidesRepository.sendSlideRequest(presentationFileInfo.id, contentChanges);
    }
}