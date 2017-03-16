function ReminderScenario() {
}

ReminderScenario.prototype.talentPoolEmail = new TalentPoolReminderEmail();

ReminderScenario.prototype.run = function() {
    try {
        var globersUniverse = this.getTalentPoolGlobers();
        var globersNeedingCVReminder = this.filterGlobersByRule(globersUniverse);
        this.remindGlobers(globersNeedingCVReminder);
    } catch (error) {
        // TODO: Do something about the error.
        throw error;
    }
}

ReminderScenario.prototype.getTalentPoolGlobers = function() {
    var spreadSheetRepo = new SpreadsheetRepository({id: '1FOgt6rkq9fIFU_woYhTHw6wro__egIlPg-8ckfsmlGQ', 
                                                lookupSheetIndex: 0, 
                                                titleRowIndex: 0});

    var metaData = {
        email: 3,
        firstName: 1,
        lastName: 2,
        updatedCV: 25,
        benchStart: 31
    };

    return spreadSheetRepo.getAllDataRows(metaData);
}

ReminderScenario.prototype.mergeWithGlobantBiosProfile = function(glober) {
    var spreadSheetRepo = new SpreadsheetRepository({id: '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY', 
                                                lookupSheetIndex: 0, 
                                                titleRowIndex: 0, 
                                                emailColumnIndex: 1});

    var globantProfileMetadata = {
        ts: 0,
        email: 1
    };
    
    var globerProfile = spreadSheetRepo.getDataByEmail(globantProfileMetadata, glober.email);
    return merge(glober, globerProfile);
}

ReminderScenario.prototype.remindGlobers = function(globersNeedingCVReminder){
    var recipientsForReminderEmail = this.getGlobersAsEmailRecipients(globersNeedingCVReminder);
    this.talentPoolEmail.send(recipientsForReminderEmail);

    //TODO: Update Talent Pool Spreadsheet.
}

ReminderScenario.prototype.getGlobersAsEmailRecipients = function(pendingUpdateGlobers) {
    var commaSeparatedEmailRecipients = "";

    for(var i = 0; i < pendingUpdateGlobers.length; i++) {
        if(commaSeparatedEmailRecipients.length > 0 ) {
            commaSeparatedEmailRecipients += ', ';
        }

        commaSeparatedEmailRecipients += pendingUpdateGlobers[i].email;
    }

    return commaSeparatedEmailRecipients;
} 