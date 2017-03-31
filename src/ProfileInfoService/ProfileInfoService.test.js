const ProfileInfoService = require('./ProfileInfoService');
const mockedTalentPoolRepo = require('../../mocking/mockedTalentPoolRepo');
const mockedGloberBiosRepo = require('../../mocking/mockedGloberBiosRepo');

describe('ProfileInfoService', () =>{
    test('can be required', () => {
        expect(ProfileInfoService).toBeDefined();
        expect(ProfileInfoService).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new ProfileInfoService({}, {});
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(ProfileInfoService);
    });

    test('#getTalentPoolProfile()', () => {
        const expectedEmail = 'alan.zambrano@globant.com';
        let profileInfoService = new ProfileInfoService(mockedTalentPoolRepo, {});
        const talentPoolProfile = profileInfoService.getTalentPoolProfile(expectedEmail);
        
        expect(talentPoolProfile).toBeDefined();
        expect(talentPoolProfile).toEqual(expect.objectContaining({
            email: expectedEmail,
            globerId: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            birthDate: expect.any(String),
            entryDate: expect.any(String),
            role: expect.any(String),
            seniority: expect.any(String),
            location: expect.any(String)
        }));
    });

    test('#getGloberBiosProfile()', () => {
        const expectedEmail = 'alan.zambrano@globant.com';
        let profileInfoService = new ProfileInfoService(mockedTalentPoolRepo, mockedGloberBiosRepo);
        const globersBioProfile = profileInfoService.getGloberBiosProfile(expectedEmail);

        expect(globersBioProfile).toBeDefined();
        expect(globersBioProfile).toEqual(expect.objectContaining({
            id: expect.any(String),
            email: expectedEmail,
            career: expect.any(String),
            programming: expect.any(String),
            jsFrameworks: expect.any(String),
            databases: expect.any(String),
            mvcFrameworkds: expect.any(String),
            presentation: expect.any(String),
            mobile: expect.any(String),
            bigData: expect.any(String),
            testing: expect.any(String),
            other: expect.any(String),
            tools: expect.any(String),
            english: expect.any(String),
            spanish: expect.any(String),
            portuguese: expect.any(String),
            otherlanguages: expect.any(String)
        }));
    });

    test('#getGloberCompleteProfile()', () => {
        const expectedEmail = 'alan.zambrano@globant.com';
        let profileInfoService = new ProfileInfoService(mockedTalentPoolRepo, mockedGloberBiosRepo);
        const globerCompleteProfile = profileInfoService.getGloberCompleteProfile(expectedEmail);

        expect(globerCompleteProfile).toBeDefined();
        expect(globerCompleteProfile).toEqual(expect.objectContaining({
            id: expect.any(String),
            email: expectedEmail,
            career: expect.any(String),
            programming: expect.any(String),
            jsFrameworks: expect.any(String),
            databases: expect.any(String),
            mvcFrameworkds: expect.any(String),
            presentation: expect.any(String),
            mobile: expect.any(String),
            bigData: expect.any(String),
            testing: expect.any(String),
            other: expect.any(String),
            tools: expect.any(String),
            english: expect.any(String),
            spanish: expect.any(String),
            portuguese: expect.any(String),
            otherlanguages: expect.any(String),
            globerId: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
            birthDate: expect.any(String),
            entryDate: expect.any(String),
            role: expect.any(String),
            seniority: expect.any(String),
            location: expect.any(String)
        }));
    
        expect(globerCompleteProfile.fullName).toEqual(`${globerCompleteProfile.firstName} ${globerCompleteProfile.lastName}`);
        expect(globerCompleteProfile.fullRole).toEqual(`${globerCompleteProfile.role} ${globerCompleteProfile.seniority}`);
    });
});