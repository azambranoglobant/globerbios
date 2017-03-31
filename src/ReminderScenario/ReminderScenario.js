const getDaysDiffFromNow = require('../Utilities/Utilities').getDaysDiffFromNow;
const merge = require('../Utilities/Utilities').merge;

function ReminderScenario(talentPoolRepo, globerBiosRepo, talentPoolEmail) {
    this.talentPoolRepo = talentPoolRepo;
    this.globerBiosRepo = globerBiosRepo;   
    this.talentPoolEmail = talentPoolEmail;

    if(this.talentPoolRepo === undefined) {
        this.talentPoolRepo = new SpreadsheetRepository({id: '1FOgt6rkq9fIFU_woYhTHw6wro__egIlPg-8ckfsmlGQ', 
                                                lookupSheetIndex: 0, 
                                                titleRowIndex: 0,
                                                emailColumnIndex: 3});
    }

    if(this.globerBiosRepo === undefined) {
        this.globerBiosRepo = new SpreadsheetRepository({id: '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY', 
                                                lookupSheetIndex: 0, 
                                                titleRowIndex: 0, 
                                                emailColumnIndex: 1});
    }

    if(this.talentPoolEmail === undefined) {
        this.talentPoolEmail = new TalentPoolReminderEmail();
    }
}

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
    var metaData = {
        email: 3,
        firstName: 1,
        lastName: 2,
        updatedCV: 25,
        benchStart: 31,
        lastCvReminder: 32
    };

    var talentPoolGlobers = this.talentPoolRepo.getAllDataRows(metaData);

    var filteredGlobers = [];
    for (var index = 0; index < talentPoolGlobers.length; index++) {
        var glober = talentPoolGlobers[index];
        var lastCVReminder = getDaysDiffFromNow(new Date(glober.lastCvReminder));

        // TODO: Move the 30 days value to a constant.
        if(lastCVReminder >= 30 || isNaN(lastCVReminder)) {
            filteredGlobers.push(glober);
        }
    }

    return filteredGlobers;
}

ReminderScenario.prototype.mergeWithGlobantBiosProfile = function(glober) {
    var globantProfileMetadata = {
        ts: 0,
        email: 1
    };
    
    var globerProfile = this.globerBiosRepo.getDataByEmail(globantProfileMetadata, glober.email);
    
    return merge(glober, globerProfile);
}

ReminderScenario.prototype.remindGlobers = function(globersNeedingCVReminder){
    var recipientsForReminderEmail = this.getGlobersAsEmailRecipients(globersNeedingCVReminder);
    this.talentPoolEmail.send(recipientsForReminderEmail);

    for (var globerIndex = 0; globerIndex < globersNeedingCVReminder.length; globerIndex++) {
        var glober = globersNeedingCVReminder[globerIndex];
        var timeStamp = new Date().toUTCString();
        this.talentPoolRepo.updateCellForGlober(glober.email, { column: 33, value: timeStamp });
    }
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

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = ReminderScenario;
}