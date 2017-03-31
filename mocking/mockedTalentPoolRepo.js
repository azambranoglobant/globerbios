let moreThanOneMonthAgo = new Date();
moreThanOneMonthAgo.setDate(moreThanOneMonthAgo.getDate() - 31);

const mockedTalentPoolRepo = {
    globersData: [
        {
            email: 'alan.zambrano@globant.com',
            firstName: 'Alan',
            lastName: 'Zambrano',
            updatedCV: moreThanOneMonthAgo,
            benchStart: new Date(),
            lastCvReminder: moreThanOneMonthAgo
        }, {
            email: 'bruno.guardia@globant.com',
            firstName: 'Bruno',
            lastName: 'Guardia',
            updatedCV: new Date(),
            benchStart: new Date(),
            lastCvReminder: (new Date()).toGMTString()
        }, {
            email: 'jose.valencia@globant.com',
            firstName: 'Jose Luis',
            lastName: 'Valencia',
            updatedCV: new Date(),
            benchStart: new Date(),
            lastCvReminder: (new Date()).toGMTString()
        }, {
            email: 'sofia.galan@globant.com',
            firstName: 'Sofia',
            lastName: 'Galan',
            updatedCV: moreThanOneMonthAgo,
            benchStart: new Date(),
            lastCvReminder: moreThanOneMonthAgo
        }, {
            email: 'lucia.echenique@globant.com',
            firstName: 'Lucia',
            lastName: 'Echenique',
            updatedCV: moreThanOneMonthAgo,
            benchStart: new Date(),
            lastCvReminder: moreThanOneMonthAgo
        }
    ],
    getAllDataRows: function (metaData) {
        return this.globersData;
    },
    updateCellForGlober: function (globerEmail, cellUpdate) {
        const talentPoolGlobers = this.globersData;
        let updatedGlobers = talentPoolGlobers.map((glober) => {
            if (glober.email === globerEmail) {
                glober.lastCvReminder = cellUpdate.value;
            }
            return glober;
        });

        this.globersData = updatedGlobers;
    },
    resetLastCvAt: function (index) {
        this.globersData[index].lastCvReminder = undefined
    },
    getGloberAt: function (index) {
        return this.globersData[index];
    }
};

module.exports = mockedTalentPoolRepo;