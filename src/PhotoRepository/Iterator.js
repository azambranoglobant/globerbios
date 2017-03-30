function Iterator(array) {
    var index = 0;
    return {
        first: function () {
            this.reset();
            return this.next();
        },
        hasNext: function () {
            return index <= array.length - 1;
        },
        next: function () {
            return array[index++];
        },
        reset: function () {
            index = 0;
        }
    }
}

module.exports = Iterator;