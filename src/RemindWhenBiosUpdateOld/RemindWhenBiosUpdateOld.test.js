const RemindWhenBiosUpdateOld = require('./RemindWhenBiosUpdateOld');
const mockedTalentPoolRepo = require('../../mocking/mockedTalentPoolRepo');

describe('RemindWhenBiosUpdateOld', () => {
    test('can be required', () => {
        expect(RemindWhenBiosUpdateOld).toBeDefined();
        expect(RemindWhenBiosUpdateOld).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new RemindWhenBiosUpdateOld();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(RemindWhenBiosUpdateOld);
    });

    test('#filterGlobersByRule()', () => {
        const expectedGlobersToFilter = ['alan.zambrano@globant.com', 'sofia.galan@globant.com'];

        let moreThanAMonthAgo = new Date();
        moreThanAMonthAgo.setDate(moreThanAMonthAgo.getDate() - 40);

        let talentPoolGlobersToFilter = mockedTalentPoolRepo.globersData.map((glober) => {
            if(expectedGlobersToFilter.some(g => g === glober.email)) glober.benchStart = moreThanAMonthAgo;
            return glober;
        });

        let reminder = new RemindWhenBiosUpdateOld();
        const filteredGlobers = reminder.filterGlobersByRule(talentPoolGlobersToFilter);

        expect(filteredGlobers).toHaveLength(expectedGlobersToFilter.length);
    });
});