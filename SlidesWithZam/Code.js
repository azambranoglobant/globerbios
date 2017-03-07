function main() {
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
  
  var profileData = spreadSheetRepo.getDataByRowIndex(talentPoolMetadata, 3);
  
  Sliderifier.sliderifyGlober(profileData);
}