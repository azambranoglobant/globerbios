const PhotoRepository = require('./PhotoRepository');
const Iterator = require('./Iterator');
const MockedGDriveFile = require('./MockedGDriveFile');

const mockedGDriveService = {
    folder: {
        files: [
            new MockedGDriveFile('12345', 'alan.zambrano', 'https://www.googleapis.com/drive/v3/files/12345'),
            new MockedGDriveFile('67890', 'bruno.guardia', 'https://www.googleapis.com/drive/v3/files/67890')
        ],
        getFiles: function () {
            return new Iterator(mockedGDriveService.folder.files);
        }
    },
    getFolderById: function (id) {
        return mockedGDriveService.folder;
    }
}

describe('PhotoRepository', () => {
    test('can be required', () => {
        expect(PhotoRepository).toBeDefined();
        expect(PhotoRepository).toBeInstanceOf(Function);
    });
    test('can be instantiated', () => {
        let instance = new PhotoRepository();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(PhotoRepository);
    });

    describe('#findPhotoByEmail()', () => {
        test("can retrieve a photo file using a glober's email", () => {
            let photoRepo = new PhotoRepository(mockedGDriveService);
            const globerEmail = 'alan.zambrano@globant.com';
            const response = photoRepo.findPhotoByEmail(globerEmail);
            
            expect(response).toBeDefined();
            expect(response).toEqual(expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                photoURL: expect.any(String)
            }));

            expect(globerEmail).toMatch(new RegExp(response.name));
        });
    });
});