const DriveRepository = require('./DriveRepository');

const mockedFetchingService = {
    fetch: function(url, parameters){
        let toExecuteOperation = Object.assign({}, parameters, {url: url});
        return JSON.stringify(toExecuteOperation);
    }
}

describe('DriveRepository', () => {
    test('can be required', () => {
        expect(DriveRepository).toBeDefined();
        expect(DriveRepository).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new DriveRepository();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(DriveRepository);
        let instanceWithParams = new DriveRepository({});
        expect(instanceWithParams).toBeDefined();
        expect(instanceWithParams).toBeInstanceOf(DriveRepository);
    });

    describe('#copyFile()', () => {
        test('can use API to copy a file by id', () => {
            const originalFileId = 'ORIGILNAL_FILE_ID';
            const newFileTitle = 'CopyFileTitle';

            let driveRepo = new DriveRepository(mockedFetchingService);
            let apiResponse = driveRepo.copyFile(originalFileId, newFileTitle);
            
            expect(apiResponse).toEqual(expect.objectContaining({
                method: 'post',
                contentType: 'application/json',
                headers: expect.any(Object),
                payload: expect.any(Object)
            }));
            expect(apiResponse.payload).toEqual(expect.objectContaining({
                name: newFileTitle
            }));

            expect(apiResponse.url).toMatch(/copy/);
            expect(apiResponse.url).toMatch(new RegExp(originalFileId));
        });
    });

    describe('#deleteFile()', () => {
        test('can delete a file by id', () => {
            const fileToDeleteId = 'FILE_TO_DELETE_ID123';

            let driveRepo = new DriveRepository(mockedFetchingService);
            const apiResponse = driveRepo.deleteFile(fileToDeleteId);

            expect(apiResponse).toBeDefined();
            const parsedResponse = JSON.parse(apiResponse);
            expect(parsedResponse).toEqual(expect.objectContaining({
                method: 'delete',
                headers: expect.any(Object)
            }));
            expect(parsedResponse.url).toMatch(new RegExp(fileToDeleteId));
        });
    });
});