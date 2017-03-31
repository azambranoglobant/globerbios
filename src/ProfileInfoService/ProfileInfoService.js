function ProfileInfoService(talentPoolRepo, globerBiosRepo) {

    var profileDataSeparator = ' ';

    this.talentPoolRepo = talentPoolRepo;
    if(this.talentPoolRepo === undefined) {
        var TALENT_POOL_DRIVE_ID = '1FOgt6rkq9fIFU_woYhTHw6wro__egIlPg-8ckfsmlGQ';
        this.talentPoolRepo = new SpreadsheetRepository({id: TALENT_POOL_DRIVE_ID, 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 3});
    }

    this.globerBiosRepo = globerBiosRepo;
    if(this.globerBiosRepo === undefined) {
        var GLOBER_BIOS_DRIVE_ID = '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY';
        var globerBiosRepo = new SpreadsheetRepository({id: GLOBER_BIOS_DRIVE_ID, 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 1});
    }
    

    this.getGloberCompleteProfile = function(globerEmail) {
        
        var globerBiosProfile = this.getGloberBiosProfile(globerEmail);
        var talentPoolProfile = this.getTalentPoolProfile(globerEmail);

        var globerProfile = merge(globerBiosProfile , talentPoolProfile);

        globerProfile.fullName = globerProfile.firstName + profileDataSeparator + globerProfile.lastName;
        globerProfile.fullRole = globerProfile.role + profileDataSeparator + globerProfile.seniority;

        return globerProfile;
    }

    this.getTalentPoolProfile = function(globerEmail) {
        

        var talentPoolProfileMetadata = {
            globerId: 0,
            firstName: 1,
            lastName: 2,
            birthDate: 4,
            entryDate: 5,
            role: 6,
            seniority: 7,
            location: 9
        };

        return this.talentPoolRepo.getDataByEmail(talentPoolProfileMetadata, globerEmail);
    }

    this.getGloberBiosProfile = function(globerEmail) {
        var globantProfileMetadata = {
            id: 0,
            email: 1,
            career: 2,
            programming: 3,
            jsFrameworks: 4,
            databases: 5,
            mvcFrameworkds: 6,
            presentation: 7,
            mobile: 8,
            bigData: 9,
            testing: 10,
            other: 11,
            tools: 12,
            english: 13,
            spanish: 15,
            portuguese: 16,
            otherlanguages: 17
        };

        return globerBiosRepo.getDataByEmail(globantProfileMetadata, globerEmail);
    }
}

if((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = ProfileInfoService;
    var merge = require('../Utilities/Utilities').merge;
}