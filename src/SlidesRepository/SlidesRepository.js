var SlidesRepository = function (FetchingService) {

    var BASE_URL = "https://slides.googleapis.com/v1/presentations/";

    var oauthToken = 'DUMMY_TOKEN';
    if((typeof ScriptApp !== 'undefined') && (typeof ScriptApp.getOAuthToken !== 'undefined')) {
        oauthToken = ScriptApp.getOAuthToken();
    }

    if(FetchingService === undefined && (typeof UrlFetchApp !== 'undefined')) {
        FetchingService = UrlFetchApp;
    }

    this.getPresentation = function (presentationId) {
        // CODE extracted from: https://ctrlq.org/code/20285-google-slides-api
        var apiUrl = BASE_URL + presentationId;

        var params = {
            method: "get",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + oauthToken
            },
            muteHttpExceptions: true
        };

        var resp = FetchingService.fetch(apiUrl, params);

        return JSON.parse(resp.getContentText());
    }

    this.getSlide = function(presentationId, slideId) {
        var url = BASE_URL + presentationId + '/pages/' + slideId;

        var params = {
            method: "get",
            contentType: "application/json",
            headers: {
                Authorization: 'Bearer ' + oauthToken
            },
            muteHttpExceptions: true
        };

        // returns a JSON response
        var resp = FetchingService.fetch(url, params);
        return JSON.parse(resp.getContentText());
    }

    this.createPresentation = function(title) {
        var url = BASE_URL;

        // Make a POST request with form data.
        var formData = "{'title': '" + title + "'}";
        var params = {
            method: 'post',
            contentType: 'application/json',
            payload: formData,
            headers: {
                'Authorization': 'Bearer ' + oauthToken
            }
        };

        FetchingService.fetch(url, params);
    }

    this.duplicateSlide = function (presentationId, slideId) {
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
                'Authorization': 'Bearer ' + oauthToken
            }
        };

        var response = FetchingService.fetch(url, params);
        return JSON.parse(response.getContentText());
    }

    this.sendSlideRequest = function(presentationId, formData) {
        if (formData == undefined || formData.length <= 0) 
            throw new Error('Invalid form data');
        
        var url = 'https://slides.googleapis.com/v1/presentations/' + presentationId + ':batchUpdate';

        var params = {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify({ requests: formData }),
            headers: {
                'Authorization': 'Bearer ' + oauthToken
            },
            muteHttpExceptions: true
        };

        FetchingService.fetch(url, params);
    }
};

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = SlidesRepository;
}