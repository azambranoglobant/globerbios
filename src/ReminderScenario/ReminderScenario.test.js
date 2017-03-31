const ReminderScenario = require('./ReminderScenario');

let moreThanOneMonthAgo = new Date();
moreThanOneMonthAgo.setDate(moreThanOneMonthAgo.getDate() - 31);

const mockedTalentPoolRepo = {
    globersData: [
        {
            email: 'alan.zambrano@globant.com',
            firstName: 'Alan',
            lastName: 'Zambrano',
            updatedCV: new Date(),
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
            updatedCV: new Date(),
            benchStart: new Date(),
            lastCvReminder: moreThanOneMonthAgo
        }, {
            email: 'lucia.echenique@globant.com',
            firstName: 'Lucia',
            lastName: 'Echenique',
            updatedCV: new Date(),
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

const mockedGloberBiosRepo = {
    data: [
        {
            email: 'alan.zambrano@globant.com',
            ts: new Date()
        }, {
            email: 'bruno.guardia@globant.com',
            ts: new Date()
        }, {
            email: 'jose.valencia@globant.com',
            ts: new Date()
        }, {
            email: 'sofia.galan@globant.com',
            ts: new Date()
        }, {
            email: 'lucia.echenique@globant.com',
            ts: new Date()
        }
    ],
    getDataByEmail: function (metaData, email) {
        return mockedGloberBiosRepo.data.find((element) => element.email === email);
    }
};

const mockedTalentPoolEmail = {
    sentEmail: undefined,
    send: function (emailRecipients) {
        this.sentEmail = emailRecipients;
    }
};

describe('ReminderScenario', () => {
    test('can be required', () => {
        expect(ReminderScenario).toBeDefined();
        expect(ReminderScenario).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new ReminderScenario({}, {}, {});
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(ReminderScenario);
    });

    describe('#getTalentPoolGlobers()', () => {
        test('gets the data set for Globers in Talent Pool', () => {
            let reminderScenario = new ReminderScenario(mockedTalentPoolRepo, mockedGloberBiosRepo, {});
            const talentPoolGlobers = reminderScenario.getTalentPoolGlobers();
            expect(talentPoolGlobers).toHaveLength(3);
        });
    });

    describe('#mergeWithGlobantBiosProfile()', () => {
        test('get globers data merged between TalentPool repo and GloberBios repo', () => {
            const glober = mockedTalentPoolRepo.getAllDataRows()[0];

            let reminderScenario = new ReminderScenario(mockedTalentPoolRepo, mockedGloberBiosRepo, {});
            const mergedData = reminderScenario.mergeWithGlobantBiosProfile(glober);

            expect(mergedData).toBeDefined();
            expect(mergedData).toEqual(expect.objectContaining({
                email: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                updatedCV: expect.any(Date),
                benchStart: expect.any(Date),
                lastCvReminder: expect.any(Date),
                ts: expect.any(Date)
            }));
        });
    });

    describe('#getGlobersAsEmailRecipients()', () => {
        test('converts an array of glober objects into a single string of email recipients', () => {
            const globersAsEmailRecipients = ['alan.zambrano@globant.com', 
                                            'bruno.guardia@globant.com', 
                                            'jose.valencia@globant.com', 
                                            'sofia.galan@globant.com', 
                                            'lucia.echenique@globant.com']
                                            .join(', ');

            let reminderScenario = new ReminderScenario(mockedTalentPoolRepo, mockedGloberBiosRepo, {});
            const emailRecipients = reminderScenario.getGlobersAsEmailRecipients(mockedTalentPoolRepo.globersData);

            expect(emailRecipients).toBeDefined();
            expect(emailRecipients).toBe(globersAsEmailRecipients);
        });
    });

    describe('#remindGlobers()', () => {
        test('reminds globers by sending an email and updating the remind flag', () => {
            mockedTalentPoolRepo.resetLastCvAt(0);
            mockedTalentPoolRepo.resetLastCvAt(3);
            mockedTalentPoolRepo.resetLastCvAt(4);
            let globersToRemind = [
                mockedTalentPoolRepo.getGloberAt(0),
                mockedTalentPoolRepo.getGloberAt(3),
                mockedTalentPoolRepo.getGloberAt(4)
            ];

            let reminderScenario = new ReminderScenario(mockedTalentPoolRepo, mockedGloberBiosRepo, mockedTalentPoolEmail);
            reminderScenario.remindGlobers(globersToRemind);

            const globersAsEmailRecipients = reminderScenario.getGlobersAsEmailRecipients(globersToRemind);
            expect(mockedTalentPoolEmail.sentEmail).toBe(globersAsEmailRecipients);

            globersToRemind = [
                mockedTalentPoolRepo.getGloberAt(0),
                mockedTalentPoolRepo.getGloberAt(3),
                mockedTalentPoolRepo.getGloberAt(4)
            ];
            globersToRemind.map((glober) => {
                expect(glober).toEqual(expect.objectContaining({
                    lastCvReminder: expect.any(String)
                }));
            });

        });
    });
});