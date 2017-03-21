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
                            requests.push(SlidesRepository.getUpdateTextRequest(element, metaElement.replacement));
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
                            return SlidesRepository.getUpdateTextRequest(element, textReplacement);
                        }
                    }
                }
            }
        }
    }
}