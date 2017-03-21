//TODO: Refactor this code into an integration test for the 'GenerateGloberBios' purpose.
function GloberBios() {
  var sliderifyConfig = {
        presentationTemplateId: '1b6vvDjqakVt32e3W0RGYA6lvByTAImy8-fAmbnX3d8Y',
        presentationTitle: 'Bios for Alan Zambrano',
        getProfileSlide: function(presentation) {
            return presentation.slides[0];
        }
    };
  
  var sliderifier = new Sliderifier(sliderifyConfig);
  sliderifier.sliderifyGlober('alan.zambrano@globant.com');
}

//TODO: Refactor this code into an integration test for the 'GenerateTeamBios' purpose.
function TeamBios(){
  
  var spreadSheetRepo = new SpreadsheetRepository({id: '11L1gTFhAGpxEic_w6zuAiDrVZT3Guq-FuNnTrGu42es', 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0});
  
  var teamMetaData = {
    email: 0,
    techRole: 1,
    teamRole: 2
  };
  
  var spreadSheetRepo2 = new SpreadsheetRepository({id: '11L1gTFhAGpxEic_w6zuAiDrVZT3Guq-FuNnTrGu42es', 
                                                  lookupSheetIndex: 1, 
                                                  titleRowIndex: 0});
  
  var teamInfoData = {
    teamName: 0,
    requestedBy: 1
  };
  
  var teamInfo = spreadSheetRepo2.getDataByRowIndex(teamInfoData, 1);
  
  teamInfo.date = 'March 2017';
  teamInfo.team = spreadSheetRepo.getAllDataRows(teamMetaData);
  
  var teamConfig = {
        presentationTemplateId: '1QWGD0dy-OGtdW_8iZo-hIVhuMjbCe-NLObxJ_AjgVEg',
        presentationTitle: 'Team Bios ' + teamInfo.teamName
    };
  
  var sliderifier = new Sliderifier(teamConfig);
  
  var presentationId = sliderifier.sliderifyTeam(teamInfo);
  Logger.log(presentationId);
  var attachmentFile = DriveApp.getFileById(presentationId);
  Logger.log(attachmentFile);
  
  MailApp.sendEmail(teamInfo.requestedBy, 'Team Bios Example', 'Here you will find your requested Team Bios Slides', {name: 'Team Bios App', attachments: [attachmentFile]});
}