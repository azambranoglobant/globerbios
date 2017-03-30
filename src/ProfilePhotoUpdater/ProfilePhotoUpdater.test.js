const ProfilePhotoUpdater = require('./ProfilePhotoUpdater');

const mockedSlideContent = {
    pageElements: [
        {
            objectId: 'GOOGLE_ID1',
            image: {},
            title: '[FOTOGLOBER]',
            shape: {
                shapeType: 'PICTURE'
            }
        }, {
            objectId: 'GOOGLE_ID2',
            shape: {
                text: {
                    textElements: [
                        {
                            textRun: {
                                content: '[PLACEHOLDER]'
                            }
                        }
                    ]
                },
                shapeType: 'TEXT_BOX'
            }
        }
    ]
};

const mockedPhotoFile = {
    id: 'PHOTO_FILE_ID123'
};

describe('ProfilePhotoUpdater', () => {
    test('can be required', () => {
        expect(ProfilePhotoUpdater).toBeDefined();
        expect(ProfilePhotoUpdater).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new ProfilePhotoUpdater();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(ProfilePhotoUpdater);
        let instanceWithParams = new ProfilePhotoUpdater({});
        expect(instanceWithParams).toBeDefined();
        expect(instanceWithParams).toBeInstanceOf(ProfilePhotoUpdater);
    });

    describe('#generate()', () => {
        test('can generate a profile request for a specified photo file', () => {
            let updater = new ProfilePhotoUpdater(mockedSlideContent);
            const request = updater.generate(mockedPhotoFile);
            
            expect(request).toBeInstanceOf(Array);
            expect(request).toHaveLength(2);
            expect(request[0].createImage).toEqual(expect.objectContaining({
                url: expect.any(String),
                elementProperties: expect.any(Object),
            }));
            expect(request[1].deleteObject).toEqual(expect.objectContaining({
                objectId: mockedSlideContent.pageElements[0].objectId
            }));
            expect(request[0].createImage.url).toMatch(new RegExp(mockedPhotoFile.id));
        });
    });
});