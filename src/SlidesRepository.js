var SlidesRepository = (function () {

    var BASE_URL = "https://slides.googleapis.com/v1/presentations/";

    function getPresentation(presentationId) {
        // CODE extracted from: https://ctrlq.org/code/20285-google-slides-api
        var apiUrl = BASE_URL + presentationId;

        var params = {
            method: "get",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true
        };

        var resp = UrlFetchApp.fetch(apiUrl, params);

        return JSON.parse(resp.getContentText());
    }

    function getSlide(presentationId, slideId) {
        var url = BASE_URL + presentationId + '/pages/' + slideId;

        var params = {
            method: "get",
            contentType: "application/json",
            headers: {
                Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true
        };

        // returns a JSON response
        var resp = UrlFetchApp.fetch(url, params);
        return JSON.parse(resp.getContentText());
    }

    function createPresentation(title) {
        var url = BASE_URL;

        // Make a POST request with form data.
        var formData = "{'title': '" + title + "'}";
        var params = {
            method: 'post',
            contentType: 'application/json',
            payload: formData,
            headers: {
                'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
            }
        };

        UrlFetchApp.fetch(url, params);
    }

    function duplicateSlide(presentationId, slideId) {
        var url = BASE_URL + presentationId + ':batchUpdate';

        var formData = {
            'requests': [
                {
                    'duplicateObject': {
                        'objectId': slideId
                    }
                }
            ]
        };

        var params = {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify(formData),
            headers: {
                'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
            }
        };

        var response = UrlFetchApp.fetch(url, params);
        return JSON.parse(response.getContentText());
    }

    function updateSlides(presentationId, formData) {
        if (formData == undefined || formData.length <= 0) 
            throw new Error('Invalid form data');
        
        var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId + ':batchUpdate';

        var params = {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify({ requests: formData }),
            headers: {
                'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true
        };

        UrlFetchApp.fetch(url, params);
    }

    return {
        getPresentation: getPresentation,
        getSlide: getSlide,
        createPresentation: createPresentation,
        duplicateSlide: duplicateSlide,
        sendSlideRequest: updateSlides,
        getUpdateTextRequest: getUpdateTextRequest,
        getUpdateImageRequest: getUpdateImageRequest
    };
})();