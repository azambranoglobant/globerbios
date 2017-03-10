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
  
  var profileData = spreadSheetRepo.getDataByRowIndex(talentPoolMetadata, 2);
  
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
  
  var profileData = spreadSheetRepo.getDataByRowIndex(talentPoolMetadata, 2);
  
  var teamConfig = {
        presentationTemplateId: '1QWGD0dy-OGtdW_8iZo-hIVhuMjbCe-NLObxJ_AjgVEg',
        presentationTitle: 'Team Bios Test 1'
    };
  
  var sliderifier = new Sliderifier(teamConfig);
  sliderifier.sliderifyTeam();
}

function Test(){
  var spreadSheetRepo = new SpreadsheetRepository({id: '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY', 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 1});
  var talentPoolMetadata = {
       id: 0,
       email: 1,
       career: 2,
       programmingLanguages: 3,
       databases: 5,
       tools: 12,
       english: 13,
       spanish: 15
     };
  
  Logger.log(spreadSheetRepo.getDataByEmail(talentPoolMetadata, 'andrea.duran@globant.com'));
  Logger.log(spreadSheetRepo.getDataByEmail(talentPoolMetadata, 'hernan.garcia@globant.com'));
}