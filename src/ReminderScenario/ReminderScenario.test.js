const ReminderScenario = require('./ReminderScenario');
const mockedTalentPoolRepo = require('../../mocking/mockedTalentPoolRepo');
const mockedGloberBiosRepo = require('../../mocking/mockedGloberBiosRepo');

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