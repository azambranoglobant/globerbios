function merge(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

function getDaysDiffFromNow(targetDate) {
    var now = new Date();
    var timeDiff = Math.abs(targetDate.getTime() - now.getTime());
    var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = {
        merge,
        getDaysDiffFromNow
    }
}