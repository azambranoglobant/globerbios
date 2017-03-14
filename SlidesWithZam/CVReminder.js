var CVReminder = (function(){

   var run = function () {
        var pendingUpdateGlobers = [];

        var talentPoolGlobers = getTalentPoolGlobers();
        var globantBiosGlobers = addGlobantBiosDataFor(talentPoolGlobers);

        pendingUpdateGlobers = filterGlobersWithFormResponses(globantBiosGlobers);

        var talentPoolEmail = new TalentPoolReminderEmail(getGlobersAsEmailRecipients(pendingUpdateGlobers));
        talentPoolEmail.send();
    }

    function getTalentPoolGlobers() {
        
      var spreadSheetRepo = new SpreadsheetRepository({id: '1FOgt6rkq9fIFU_woYhTHw6wro__egIlPg-8ckfsmlGQ', 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0});
  
      var metaData = {
        email: 3,
        firstName: 1,
        lastName: 2
      };
      
      return spreadSheetRepo.getAllDataRows(metaData);
    }

    function addGlobantBiosDataFor(talentPoolGlobers) {
      var spreadSheetRepo = new SpreadsheetRepository({id: '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY', 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 1});

        var globantProfileMetadata = {
            ts: 0,
            email: 1
        };
      
        var globantBiosGlobers = [];

        for(i = 0; i < talentPoolGlobers.length; i++) {
          try {
            var globerProfile = spreadSheetRepo.getDataByEmail(globantProfileMetadata, talentPoolGlobers[i].email);
            var mergedProfile = merge(talentPoolGlobers[i], globerProfile);

            globantBiosGlobers.push(mergedProfile);
          } catch(e){
            // Glober may be already included in the talent pool spreadsheet but doesn't have a Glober Bios entry.
            // We skip that glober.
            continue;
          }
        }
      
        return globantBiosGlobers;
    }

    function filterGlobersWithFormResponses(globantBiosGlobers) {
        var filteredGlobers = [];

        // TODO: Filter using the Globant Bios Responses spreadsheet and the business conditions.
        filteredGlobers = globantBiosGlobers;

        return filteredGlobers;
    }

    function getGlobersAsEmailRecipients(pendingUpdateGlobers) {
        var commaSeparatedEmailRecipients = "";

        for(var i = 0; i < pendingUpdateGlobers.length; i++) {
            if(commaSeparatedEmailRecipients.length > 0 ) {
                commaSeparatedEmailRecipients += ', ';
            }

            commaSeparatedEmailRecipients += pendingUpdateGlobers[i].email;
        }

        return commaSeparatedEmailRecipients;
    }

    return {
         run: run
    };
})();