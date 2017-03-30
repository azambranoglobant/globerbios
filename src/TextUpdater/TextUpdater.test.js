const TextUpdater = require('./TextUpdater');

const mockedSlideContent = {
    pageElements: [
        {
            shape: {
                text: 'Makes no sense',
                shapeType: 'PICTURE'
            }
        }, {
            objectId: 'GOOGLE_ID',
            shape: {
                text: {
                    textElements: [
                        {
                            textRun: {
                                content: 'One'
                            }
                        }, {
                            textRun: {
                                content: 'Two'
                            }
                        }, {
                            textRun: {
                                content: '[PLACEHOLDER]'
                            }
                        }
                    ]
                },
                shapeType: 'TEXT_BOX'
            }
        },
        {
            objectId: 'GOOGLE_ID2',
            shape: {
                text: {
                    textElements: [
                        {
                            textRun: {
                                content: '[TEAM NAME]'
                            }
                        }, {
                            textRun: {
                                content: '[PRESENTATION DATE]'
                            }
                        }
                    ]
                },
                shapeType: 'TEXT_BOX'
            }
        }
    ]
};

describe('TextUpdater', () => {
    test('can be required', () => {
        expect(TextUpdater).toBeDefined();
        expect(TextUpdater).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new TextUpdater();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(TextUpdater);

        let instanceWithParameters = new TextUpdater({pageElements: 'param1'});
        expect(instanceWithParameters).toBeDefined();
        expect(instanceWithParameters).toBeInstanceOf(TextUpdater);
    });

    describe('#generateRequest()', () => {
        test('generates a request for a text placeholder and a replacement value', () => {
            let updater = new TextUpdater(mockedSlideContent);
            const newValue = 'Value';
            const request = updater.generateRequest('[PLACEHOLDER]', newValue);
            
            expect(request).toBeInstanceOf(Array);
            expect(request).toHaveLength(2);
            expect(request[0].deleteText).toEqual(expect.objectContaining({
                objectId: expect.any(String),
                textRange: expect.any(Object),
            }));
            expect(request[1].insertText).toEqual(expect.objectContaining({
                objectId: expect.any(String),
                text: expect.any(String),
                insertionIndex: expect.any(Number)
            }));

            expect(request[0].deleteText.objectId).toEqual(mockedSlideContent.pageElements[1].objectId);
            expect(request[1].insertText.objectId).toEqual(mockedSlideContent.pageElements[1].objectId);
            expect(request[1].insertText.text).toEqual(newValue);
        });
    });

    describe('#generate()', () => {
        test('generates a set of requests for updating values for a fixed metadata', () => {
            let updater = new TextUpdater(mockedSlideContent);
            const metaData = [{placeholder: '[TEAM NAME]', replacement: 'Name'}, 
                            {placeholder: '[PRESENTATION DATE]', replacement: '04/01/1989'}];

            const requests = updater.generate(metaData);
            expect(requests).toBeInstanceOf(Array);
            expect(requests).toHaveLength(2);

            const firstRequest = requests[0];
            expect(firstRequest).toBeInstanceOf(Array);
            expect(firstRequest).toHaveLength(2);
            expect(firstRequest[0].deleteText).toEqual(expect.objectContaining({
                objectId: expect.any(String),
                textRange: expect.any(Object),
            }));
            expect(firstRequest[1].insertText).toEqual(expect.objectContaining({
                objectId: expect.any(String),
                text: expect.any(String),
                insertionIndex: expect.any(Number)
            }));

            expect(firstRequest[0].deleteText.objectId).toEqual(mockedSlideContent.pageElements[2].objectId);
            expect(firstRequest[1].insertText.objectId).toEqual(mockedSlideContent.pageElements[2].objectId);
            expect(firstRequest[1].insertText.text).toEqual(metaData[0].replacement);

            const secondRequest = requests[1];
            expect(secondRequest).toBeInstanceOf(Array);
            expect(secondRequest).toHaveLength(2);
            expect(secondRequest[0].deleteText).toEqual(expect.objectContaining({
                objectId: expect.any(String),
                textRange: expect.any(Object),
            }));
            expect(secondRequest[1].insertText).toEqual(expect.objectContaining({
                objectId: expect.any(String),
                text: expect.any(String),
                insertionIndex: expect.any(Number)
            }));
            expect(secondRequest[0].deleteText.objectId).toEqual(mockedSlideContent.pageElements[2].objectId);
            expect(secondRequest[1].insertText.objectId).toEqual(mockedSlideContent.pageElements[2].objectId);
            expect(secondRequest[1].insertText.text).toEqual(metaData[1].replacement);
        });
    });
});