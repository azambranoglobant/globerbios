function merge(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

function getDaysDiffFromNow(targetDate) {
    var now = new Date();
    var timeDiff = Math.abs(targetDate.getTime() - now.getTime());
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

function getMonthYearText() {
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
                   ];
  
  var currentDate = new Date();
  return monthNames[currentDate.getMonth()]+ ' ' + currentDate.getYear();
}

function getTeamConfig(teamName){
  var teamConfig = {
        presentationTemplateId: '1EHTluNGBhrLPK8vBuPIdoLcMlJRIBlqWRbDzwXadJnw',
        presentationTitle: 'Team Bios ' + teamName
    };
  
  return teamConfig;
  
}