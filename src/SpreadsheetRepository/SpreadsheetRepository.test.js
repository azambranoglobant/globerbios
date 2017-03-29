const SpreadsheetRepository = require('./SpreadsheetRepository');

let mockSpreadSheetService = {
    openById: function (id) {
        return {
            getSheets: function () {
                return [
                    {
                        getDataRange: function () {
                            return {
                                dataArray: [["Email", "Name", "LastName"], 
                                            ["alan.zambrano@globant.com", "Alan", "Zambrano"],
                                            ["bruno.guardia@globant.com", "Bruno", "Guardia"]],

                                getCell: function(row, column){
                                    return {
                                        ref: this.dataArray,
                                        value: this.dataArray[row][column],
                                        setValue: function(newValue){
                                            this.ref[row][column] = newValue;
                                        }
                                    };
                                },
                                getValues: function () {
                                    return this.dataArray;
                                }
                            };
                        }
                    }
                ];
            }
        }
    }
};

let testConfig = {
    lookupSheetIndex: 0,
    titleRowIndex: 0,
    emailColumnIndex: 0
};

describe('SpreadsheetRepository', () => {
    test('can be required', () => {
        expect(SpreadsheetRepository).toBeDefined();
        expect(SpreadsheetRepository).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instanceWithMockedService = new SpreadsheetRepository(testConfig, mockSpreadSheetService);
        expect(instanceWithMockedService).toBeDefined();
        expect(instanceWithMockedService).toBeInstanceOf(SpreadsheetRepository);

        let instanceWithoutMockedService = new SpreadsheetRepository();
        expect(instanceWithoutMockedService).toBeDefined();
        expect(instanceWithoutMockedService).toBeInstanceOf(SpreadsheetRepository);
    });

    describe('#getDataByEmail()', () => {
        test('gets data for a valid email', () => {
            let testingRepo = new SpreadsheetRepository(testConfig, mockSpreadSheetService);
            let globerInfo = testingRepo.getDataByEmail({email: 0, name: 1}, 'alan.zambrano@globant.com');
            
            expect(globerInfo).toBeDefined();
            expect(globerInfo).toEqual(expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
            }));
        });
    });

    describe('#getDataByRowIndex()', () => {
        test('get data specifying a row index', () => {
            let testingRepo = new SpreadsheetRepository(testConfig, mockSpreadSheetService);
            let globerInfo = testingRepo.getDataByRowIndex({email: 0, name: 1}, 1);

            expect(globerInfo).toBeDefined();
            expect(globerInfo).toEqual(expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
            }));
        });
    });

    describe('#getDataByRowIndexNamed()', () => {
        test('gets data using named titles in the metadata', () => {
            let testingRepo = new SpreadsheetRepository(testConfig, mockSpreadSheetService);
            let globerInfo = testingRepo.getDataByRowIndexNamed({email: "Email", name: "Name"}, 1);

            expect(globerInfo).toBeDefined();
            expect(globerInfo).toEqual(expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
            }));
        });
    });

    describe('#getAllDataRows()', () => {
        test('get all data from data source', () => {
            let testingRepo = new SpreadsheetRepository(testConfig, mockSpreadSheetService);
            let globers = testingRepo.getAllDataRows({email: 0, name: 1});

            expect(globers).toBeDefined();
            expect(globers).toBeInstanceOf(Array);
            expect(globers.length).toEqual(2);       
        });
    });

    describe('#updateCellForGlober()', () => {
        test('updating a cell reflects the change in the data source', () => {
            let duplicatedService = Object.assign({}, mockSpreadSheetService);
            let testingRepo = new SpreadsheetRepository(testConfig, duplicatedService);

            let globerInfo = testingRepo.getDataByRowIndex({email: 0, name: 1, lastName: 2}, 2);
            expect(globerInfo).toEqual(expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
                lastName: expect.any(String)
            }));

            let newLastName = 'Lopez';
            testingRepo.updateCellForGlober('alan.zambrano@globant.com', {column: 2, value: newLastName});

            let globerUpdated = testingRepo.getDataByRowIndex({email: 0, name: 1, lastName: 2}, 2);

            expect(globerUpdated).toEqual(expect.objectContaining({
                email: expect.any(String),
                name: expect.any(String),
                lastName: expect.any(String)
            }));

            expect(globerInfo.lastName).not.toEqual(globerUpdated.lastName);
            expect(globerUpdated.lastName).toEqual(newLastName);
        });
    });
});

