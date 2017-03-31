function RemindWhenBiosUpdateOld(){
    var LAST_CVUPDATE_TIME_LIMIT_IN_DAYS = 30;
    var BENCH_START_TIME_LIMIT_IN_DAYS = 30;
    var thisClass = this;

    this.filterGlobersByRule = function(talentPoolGlobers) {
        var pendingTalentPoolGlobers = filterGlobersWithOldBenchStart(talentPoolGlobers);
        var globersNeedingCVReminder = determineGlobersWithOldCV(pendingTalentPoolGlobers);
        return globersNeedingCVReminder;
    }

    var filterGlobersWithOldBenchStart = function(globers) {
        var globersWithOldBenchStart = [];

        for(var i = 0; i < globers.length; i++) {
            var benchStart = getDaysDiffFromNow(new Date(globers[i].benchStart));
            if(benchStart >= BENCH_START_TIME_LIMIT_IN_DAYS) {
                globersWithOldBenchStart.push(globers[i]);
            }
        }

        return globersWithOldBenchStart;
    }

    var determineGlobersWithOldCV = function(pendingTalentPoolGlobers) {
        var globersNeedingCVReminder = [];

        for(i = 0; i < pendingTalentPoolGlobers.length; i++) {
          try {
            var globantBioProfile = thisClass.mergeWithGlobantBiosProfile(pendingTalentPoolGlobers[i]);
            var lastCVUpdate = getDaysDiffFromNow(new Date(globantBioProfile.ts));

            if(lastCVUpdate >= LAST_CVUPDATE_TIME_LIMIT_IN_DAYS){
                globersNeedingCVReminder.push(pendingTalentPoolGlobers[i]);
            }
          } catch(e) {
            // Including globers with no profile in the Glober Bios Spreadsheet.
            globersNeedingCVReminder.push(pendingTalentPoolGlobers[i]);
          }
        }

        return globersNeedingCVReminder;
    }
}

RemindWhenBiosUpdateOld.prototype = Object.create(ReminderScenario.prototype);