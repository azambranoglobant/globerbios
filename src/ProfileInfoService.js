function ProfileInfoService() {

    var TALENT_POOL_DRIVE_ID = '18Lj3jzw6mgkhX1_lyXQfTsKOTu4-ujvAsrEHOxszy0Q';
    var GLOBER_BIOS_DRIVE_ID = '16yR0xcLovu-8OMR7TMLJih6SgviAYdD5mUYtpL8o9cY';
    var profileDataSeparator = ' ';
    
    this.getGloberCompleteProfile = function(globerEmail) {
      var talentPoolProfile = this.getTalentPoolProfile(globerEmail);
      var globerBiosProfile = null;
      
      try {
        globerBiosProfile = this.getGloberBiosProfile(globerEmail);
      } catch(e) {
        globerBiosProfile = {
            id: '',
            career: '',
            programming: '',
            jsFrameworks: '',
            databases: '',
            mvcFrameworkds: '',
            presentation: '',
            mobile: '',
            bigData: '',
            testing: '',
            other: '',
            tools: '',
            english: '',
            spanish: '',
            portuguese: '',
            otherlanguages: ''
        };
      }
      
        var globerProfile = merge(talentPoolProfile, globerBiosProfile);

        globerProfile.fullName = globerProfile.firstName + profileDataSeparator + globerProfile.lastName;
        globerProfile.fullRole = globerProfile.role + profileDataSeparator + globerProfile.seniority;

        return globerProfile;
    }

    this.getTalentPoolProfile = function(globerEmail) {
        var spreadSheetRepo = new SpreadsheetRepository({id: TALENT_POOL_DRIVE_ID, 
                                                  lookupSheetIndex: 19, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 3});

        var talentPoolProfileMetadata = {
            globerId: 0,
            firstName: 1,
            lastName: 2,
            email: 3,
            birthDate: 4,
            entryDate: 5,
            role: 6,
            seniority: 7,
            location: 9
        };

        return spreadSheetRepo.getDataByEmail(talentPoolProfileMetadata, globerEmail);
    }

    this.getGloberBiosProfile = function(globerEmail) {
        var spreadSheetRepo = new SpreadsheetRepository({id: GLOBER_BIOS_DRIVE_ID, 
                                                  lookupSheetIndex: 0, 
                                                  titleRowIndex: 0, 
                                                  emailColumnIndex: 1});

        var globantProfileMetadata = {
            id: 0,
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

        return spreadSheetRepo.getDataByEmail(globantProfileMetadata, globerEmail);
    }
}