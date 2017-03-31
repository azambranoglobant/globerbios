let moreThanOneMonthAgo = new Date();
moreThanOneMonthAgo.setDate(moreThanOneMonthAgo.getDate() - 31);

const mockedTalentPoolRepo = {
    globersData: [
        {
            globerId: '1',
            email: 'alan.zambrano@globant.com',
            firstName: 'Alan',
            lastName: 'Zambrano',
            birthDate: '04/01/1989',
            entryDate: '30/11/2016',
            role: 'Web UI',
            seniority: 'SSr',
            location: 'MX',
            updatedCV: moreThanOneMonthAgo,
            benchStart: new Date(),
            lastCvReminder: moreThanOneMonthAgo
        }, {
            globerId: '2',
            email: 'bruno.guardia@globant.com',
            firstName: 'Bruno',
            lastName: 'Guardia',
            birthDate: '04/01/1980',
            entryDate: '01/02/2016',
            role: 'Tech Director',
            seniority: 'Level 5',
            location: 'MX',
            updatedCV: new Date(),
            benchStart: new Date(),
            lastCvReminder: (new Date()).toGMTString()
        }, {
            globerId: '3',
            email: 'jose.valencia@globant.com',
            firstName: 'Jose Luis',
            lastName: 'Valencia',
            birthDate: '04/01/1990',
            entryDate: '01/02/2017',
            role: 'Embedded',
            seniority: 'SSr',
            location: 'MX',
            updatedCV: new Date(),
            benchStart: new Date(),
            lastCvReminder: (new Date()).toGMTString()
        }, {
            globerId: '4',
            email: 'sofia.galan@globant.com',
            firstName: 'Sofia',
            lastName: 'Galan',
            birthDate: '03/08/1992',
            entryDate: '01/02/2017',
            role: 'Web UI',
            seniority: 'Jr',
            location: 'MX',
            updatedCV: moreThanOneMonthAgo,
            benchStart: new Date(),
            lastCvReminder: moreThanOneMonthAgo
        }, {
            globerId: '5',
            email: 'lucia.echenique@globant.com',
            firstName: 'Lucia',
            lastName: 'Echenique',
            birthDate: '18/09/1989',
            entryDate: '01/02/2017',
            role: 'Web UI',
            seniority: 'SSr',
            location: 'MX',
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
    getDataByEmail: function(metaData, email) {
        return this.globersData.find((glober) => glober.email === email);
    },
    resetLastCvAt: function (index) {
        this.globersData[index].lastCvReminder = undefined
    },
    getGloberAt: function (index) {
        return this.globersData[index];
    }
};

module.exports = mockedTalentPoolRepo;