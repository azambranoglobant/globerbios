function GloberBios() {
  var spreadSheetRepo = new SpreadsheetRepository({id: '1FOgt6rkq9fIFU_woYhTHw6wro__egIlPg-8ckfsmlGQ', lookupSheetIndex: 0, titleRowIndex: 0});
  var talentPoolMetadata = {
       id: 'Glober ID',
       fullName: 'First Name',
       description: 'Last Name',
       role: 'Role',
       seniority: 'Seniority',
       yearsOfExp: '6',
       generalRole: 'Role',
       languages: 'Javascript, C# and Python',
       tools: 'Visual Studio',
       email: 'Email'
     };
  
  var profileData = spreadSheetRepo.getDataByRowIndexNamed(talentPoolMetadata, 2);
  
  var sliderifyConfig = {
        presentationTemplateId: '1b6vvDjqakVt32e3W0RGYA6lvByTAImy8-fAmbnX3d8Y',
        presentationTitle: 'Bios for Alan Zambrano',
        getProfileSlide: function(presentation) {
            return presentation.slides[0];
        }
    };
  
  var sliderifier = new Sliderifier(sliderifyConfig);
  sliderifier.sliderifyGlober(profileData);
}

function TeamBios(){
  
  var spreadSheetRepo = new SpreadsheetRepository({id: '11L1gTFhAGpxEic_w6zuAiDrVZT3Guq-FuNnTrGu42es', 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0});
  
  var teamMetaData = {
    email: 0,
    fullName: 1,
    role: 2,
    teamRole: 3
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