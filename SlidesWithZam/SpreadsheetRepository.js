function SpreadsheetRepository(spreadsheetConfig) {
  
  var spreadsheetId = spreadsheetConfig.id;
  var lookupSheetIndex = spreadsheetConfig.lookupSheetIndex;
  var titleRowIndex = spreadsheetConfig.titleRowIndex;
  
  this.getDataByRowIndex = function(metaData, rowIndex) {
    
    var ssheet = SpreadsheetApp.openById(spreadsheetId);
    var sheets = ssheet.getSheets();
    var globersSheet = sheets[lookupSheetIndex];
    var dataRange = globersSheet.getDataRange();
    var dataValues = dataRange.getValues();
    
    if(rowIndex >= dataValues.length || rowIndex < 0) {
      throw new Error('Inexistent data for row ' + rowIndex);
    }
    
   var resultObj = {};
    
    for(var property in metaData) {
      
      if(metaData.hasOwnProperty(property)){
        
        for (var columnIndex = 0; columnIndex < dataValues[titleRowIndex].length; columnIndex++) {
          
          if(dataValues[titleRowIndex][columnIndex] === metaData[property]) {
            
            resultObj[property] = dataValues[rowIndex][columnIndex];
            break;
          }
          
        }
        
      }
      
    }
    
    return resultObj;
    
  }
}