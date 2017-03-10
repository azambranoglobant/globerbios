function SpreadsheetRepository(spreadsheetConfig) {
  
  var titleRowIndex = spreadsheetConfig.titleRowIndex;
  var dataValues = null;
  
  var loadSpreadSheetDataValues = function() {
    if(dataValues === null) {
      var ssheet = SpreadsheetApp.openById(spreadsheetConfig.id);
      var sheets = ssheet.getSheets();
      var globersSheet = sheets[spreadsheetConfig.lookupSheetIndex];
      var dataRange = globersSheet.getDataRange();
      dataValues = dataRange.getValues();
    }
  }

  var findRowIndexByValueInColumn = function(value, columnIndex) {
    for (var i = titleRowIndex + 1; i < dataValues.length; i++) {
      if(dataValues[i][columnIndex] === value) {
        return i;
      }
    }

    throw new Error('Inexistent data for value ' + value);
  }

  this.getDataByEmail = function(metaData, email) {
    var dataRowIndex = findRowIndexByValueInColumn(email, spreadsheetConfig.emailColumnIndex);
      
    var resultObj = {};

    for (var property in metaData) {
      if (metaData.hasOwnProperty(property)) {
        var propertyIndex = metaData[property];
        resultObj[property] = dataValues[dataRowIndex][propertyIndex];
      }
    }

    return resultObj;
  }

  this.getDataByRowIndex = function(metaData, rowIndex) {
    if(rowIndex >= dataValues.length || rowIndex < 0) {
      throw new Error('Inexistent data for row ' + rowIndex);
    }

    var resultObj = {};

    for (var property in metaData) {
      if (metaData.hasOwnProperty(property)) {
        var propertyIndex = metaData[property];
        resultObj[property] = dataValues[rowIndex][propertyIndex];
      }
    }

    return resultObj;
  }

  this.getDataByRowIndexNamed = function(metaData, rowIndex) {
    
    if(rowIndex >= dataValues.length || rowIndex < 0) {
      throw new Error('Inexistent data for row ' + rowIndex);
    }
    
   var resultObj = {};
    
    for(var property in metaData) {
      if(metaData.hasOwnProperty(property)) {
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

  this.getAllDataRows = function(metaData) {
    var dataRows = [];

    for (var rowIndex = titleRowIndex + 1; rowIndex < dataValues.length; rowIndex++) {
      var resultObj = {};

      for (var property in metaData) {
        if (metaData.hasOwnProperty(property)) {
          var columnIndex = metaData[property];    
          resultObj[property] = dataValues[rowIndex][columnIndex];
        }
      }

      dataRows.push(resultObj);
    }

    return dataRows;
  }

  loadSpreadSheetDataValues();
}