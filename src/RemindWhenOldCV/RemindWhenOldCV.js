if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    var ReminderScenario = require('../ReminderScenario/ReminderScenario');
    var getDaysDiffFromNow = require('../Utilities/Utilities').getDaysDiffFromNow;
    module.exports = RemindWhenOldGlowCV;
}

function RemindWhenOldGlowCV() {
    var UPDATED_CV_LIMIT_IN_DAYS = 30;

    this.filterGlobersByRule = function (talentPoolGlobers) {
        var filteredGlobers = [];

        for (var i = 0; i < talentPoolGlobers.length; i++) {
            var glober = talentPoolGlobers[i];
            var lastUpdatedCV = getDaysDiffFromNow(new Date(glober.updatedCV));
            if (lastUpdatedCV >= UPDATED_CV_LIMIT_IN_DAYS) {
                filteredGlobers.push(glober);
            }
        }

        return filteredGlobers;
    }
}

RemindWhenOldGlowCV.prototype = Object.create(ReminderScenario.prototype);