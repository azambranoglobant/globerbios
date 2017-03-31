const RemindWhenOldCV = require('./RemindWhenOldCV');
const mockedTalentPoolRepo = require('../../mocking/mockedTalentPoolRepo');

describe('RemindWhenOldCV', () => {
    test('can be required', () => {
        expect(RemindWhenOldCV).toBeDefined();
        expect(RemindWhenOldCV).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new RemindWhenOldCV();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(RemindWhenOldCV);
    });

    describe('#filterGlobersByRule()', () => {
        test("can filter globers when the 'old cv' rule applies", () => {
            let reminderScenario = new RemindWhenOldCV();
            const filterGlobers = reminderScenario.filterGlobersByRule(mockedTalentPoolRepo.globersData);

            expect(filterGlobers).toHaveLength(3);
        });
    });
});