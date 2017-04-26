function notify(teamData, sliderifyResult) {

  var presentationId = sliderifyResult.presentationId;
  var attachmentFile = DriveApp.getFileById(presentationId);
  
  var emailBody_line1 = 'Here you will find your requested Team Bios presentation for: <u>' + teamData.teamName + '</u>.'
  var emailBody_line2 = 'Please make sure that the information is accurate and correct any mispelled words. Some styles may need to be adjusted as well due to an issue coming from the data source.';
  var emailBody_line4 = "<a href='https://drive.google.com/open?id=" + presentationId + "'>You can edit it here.</a>";
  var emailBody_line3 = 'If you find any inconvenient using this tool, please report it to <strong>alan.zambrano@globant.com</strong>';
  var emailBody = emailBody_line1 + '<br /><br />' + emailBody_line2 + '<br /><br />' + emailBody_line4 + '<br /><br />' + emailBody_line3;
  
  if(sliderifyResult.notFoundGlobers.length > 0) {
    var emailBody_line5 = "The following globers couldn't be included:";
    var emailBody_line6 = emailsAsString(sliderifyResult.notFoundGlobers);
    emailBody += '<br /><br />' + emailBody_line5 + '<br /><br />' + emailBody_line6;
  }
   
  MailApp.sendEmail({
    to: teamData.requestedBy,
    subject: 'Team Bios Slides',
    htmlBody: emailBody,
    attachments: [attachmentFile]
  });  
}

function emailsAsString(emails) {
  var outputString = '';
  
  for(var i = 0; i < emails.length; i++){
    if(outputString.length > 0) {
      outputString += ', ';
    }
    
    outputString += emails[i];
  }
  
  return outputString;
}
