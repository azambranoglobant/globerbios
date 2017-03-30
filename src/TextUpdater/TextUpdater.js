//TODO: Rename to reflect the 'request generator' purpose.
function TextUpdater(slideContent) {

    var findMetadataForPlaceHolder = function(metadata, placeHolder){
        for(m = 0; m < metadata.length; m++){
            if(metadata[m].placeholder == placeHolder){
                return metadata[m];
            }
        }

        return undefined;
    }

    var getUpdateTextRequest = function(element, newText) {
        var currentRequest = [
            {
                'deleteText': {
                    'objectId': element.objectId,
                    textRange: {
                        'type': 'FROM_START_INDEX',
                        'startIndex': 0
                    }
                }
            }, {
                'insertText': {
                    'objectId': element.objectId,
                    'text': newText,
                    'insertionIndex': 0
                }
            }
        ];

        return currentRequest;
    }

    this.generate = function(metadata){
        var requests = [];

        for (i = 0; i < slideContent.pageElements.length; i++) {
            var element = slideContent.pageElements[i];

            if (element.shape != undefined && element.shape.text != undefined && element.shape.shapeType == 'TEXT_BOX') {
                for (j = 0; j < element.shape.text.textElements.length; j++) {
                    var textElement = element.shape.text.textElements[j];
                    if (textElement.textRun != undefined) {
                        var textContent = textElement.textRun.content.trim().toUpperCase();                        
                        
                        var metaElement = findMetadataForPlaceHolder(metadata, textContent);

                        if (metaElement !== undefined) {
                            requests.push(getUpdateTextRequest(element, metaElement.replacement));
                        }
                    }
                }
            }
        }

        return requests;
    }

    //TODO: Optimize/Clean function.
    this.generateRequest = function (textPlaceHolder, textReplacement) {

        for (i = 0; i < slideContent.pageElements.length; i++) {
            var element = slideContent.pageElements[i];

            if (element.shape != undefined && element.shape.text != undefined && element.shape.shapeType == 'TEXT_BOX') {
                for (j = 0; j < element.shape.text.textElements.length; j++) {
                    var textElement = element.shape.text.textElements[j];
                    if (textElement.textRun != undefined) {
                        var textContent = textElement.textRun.content.trim().toUpperCase();
                        
                        if (textContent == textPlaceHolder) {
                            return getUpdateTextRequest(element, textReplacement);
                        }
                    }
                }
            }
        }
    }
}

module.exports = TextUpdater;