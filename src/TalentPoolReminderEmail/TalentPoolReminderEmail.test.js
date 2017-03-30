const TalentPoolReminderEmail = require('./TalentPoolReminderEmail');

const mockedMailService = {
    lastEmailSent: undefined,
    sendEmail: function(emailSettings) {
        mockedMailService.lastEmailSent = emailSettings;
    }
}

describe('TalentPoolReminderEmail', () => {
    test('can be required', () => {
        expect(TalentPoolReminderEmail).toBeDefined();
        expect(TalentPoolReminderEmail).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new TalentPoolReminderEmail();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(TalentPoolReminderEmail)
    });

    describe('#send()', () => {
        test('sends the talent pool email', () => {
            let tpEmail = new TalentPoolReminderEmail(mockedMailService);
            const recipients = 'alan.zambrano@globant.com';
            tpEmail.send(recipients);

            expect(mockedMailService.lastEmailSent).toBeDefined();
            expect(mockedMailService.lastEmailSent).toEqual(expect.objectContaining({
                to: recipients,
                subject: expect.any(String),
                htmlBody: expect.any(String)
            }));
        });
    });
});