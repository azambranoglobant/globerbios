const SlidesRepository = require('./SlidesRepository');

const mockedFetchingService = {
    fetch: function(url, parameters) {
        let toExecuteOperation = Object.assign({}, parameters, {url: url});
        return {
            getContentText: function() {
                return JSON.stringify(toExecuteOperation)
            }
        };
    }
}

describe('SlidesRepository', () => {
    test('can be required', () => {
        expect(SlidesRepository).toBeDefined();
        expect(SlidesRepository).toBeInstanceOf(Function);
    });

    test('can be instantiated', () => {
        let instance = new SlidesRepository();
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(SlidesRepository);
    });

    describe('#getPresentation()', () => {
        test('get a presentation (Google Slides) details', () => {
            let slidesRepo = new SlidesRepository(mockedFetchingService);
            const presentationDetails = slidesRepo.getPresentation('');

            expect(presentationDetails).toBeDefined();
            // TODO: Complete assertion.
            console.log(presentationDetails);
        });
        
    });

    describe('#getSlide()', () => {
        test('get a single slide information', () => {
            const presentationId = 1;
            const slidesRepo = new SlidesRepository(mockedFetchingService);
            const slideInformation = slidesRepo.getSlide(presentationId);

            expect(slideInformation).toBeDefined();
            // TODO: Complete assertion.
        });
    });

    describe('#createPresentation()', () => {
        test('creates a Google Slides file', () => {
            const presentationTitle = 'My Presentation';
            const slidesRepo = new SlidesRepository(mockedFetchingService);
            slidesRepo.createPresentation(presentationTitle);

            expect(1).toBe(1);
            // TODO: Complete assertion.
        });
    });

    describe('#duplicateSlide()', () => {
        test('duplicates a slides within a Google Slides file', () => {
            const presentationId = 1;
            const slideId = 1;
            
            const slidesRepo = new SlidesRepository(mockedFetchingService);
            const duplicatedSlideInfo = slidesRepo.duplicateSlide(presentationId, slideId);

            expect(duplicatedSlideInfo).toBeDefined();
            // TODO: Complete assertion.
        });
    });

    describe('#sendSlideRequest()', () => {
        test("sends a Google Slides API request to Google's infrastructure", () => {
            const presentationId = 1;
            const formData = { };
            
            const slidesRepo = new SlidesRepository(mockedFetchingService);
            slidesRepo.sendSlideRequest(presentationId, formData);
            
            expect(1).toBe(1);
            // TODO: Complete assertion.
        })
    });
});