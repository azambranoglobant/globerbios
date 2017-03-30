function MockedGDriveFile(id, name, url) {
    this.getId = function () {
        return id;
    };

    this.getName = function () {
        return name;
    };

    this.getUrl = function () {
        return url;
    };
}

module.exports = MockedGDriveFile;