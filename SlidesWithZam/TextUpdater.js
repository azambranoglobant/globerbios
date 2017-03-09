function TextUpdater(slideContent) {

    //TODO: Create generateRequest based on a dictionary.

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