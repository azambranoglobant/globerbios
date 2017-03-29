function SpreadsheetRepository(spreadsheetConfig, SpreadsheetAppService) {
  
  var dataValues = null;
  var dataRange = null;
  
  // TODO: Add code for injecting SpreadsheetApp
  // if(SpreadsheetApp !== undefined){
  //   SpreadsheetAppService = SpreadsheetApp;
  // }

  var loadSpreadSheetDataValues = function() {
    if(dataValues === null) {
      var ssheet = SpreadsheetAppService.openById(spreadsheetConfig.id);
      var sheets = ssheet.getSheets();
      var globersSheet = sheets[spreadsheetConfig.lookupSheetIndex];
      dataRange = globersSheet.getDataRange();
      dataValues = dataRange.getValues();
    }
  }

  var findRowIndexByValueInColumn = function(value, columnIndex) {
    var titleRowIndex = spreadsheetConfig.titleRowIndex;
    
    for (var i = titleRowIndex + 1; i < dataValues.length; i++) {
      if(dataValues[i][columnIndex] === value) {
        return i;
      }
    }

    throw new Error('Inexistent data for value ' + value);
  }

  var getColumnIndexByConfigProperty = function(cellColumnTitle) {
    
    for (var key in spreadsheetConfig) {
      if (spreadsheetConfig.hasOwnProperty(key)) {
        if(cellColumnTitle === key){
          return spreadsheetConfig[key];
        }
      }
    }

    throw new Error('Inexistent column for title: ' + cellColumnTitle);
  }

  this.getDataByEmail = function(metaData, email) {
    loadSpreadSheetDataValues();
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
    loadSpreadSheetDataValues();
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
    loadSpreadSheetDataValues();
    if(rowIndex >= dataValues.length || rowIndex < 0) {
      throw new Error('Inexistent data for row ' + rowIndex);
    }
   
   var titleRowIndex = spreadsheetConfig.titleRowIndex;
   var resultObj = {};
    
    for(var property in metaData) {
      if(metaData.hasOwnProperty(property)) {
        for (var columnIndex = 0; columnIndex < dataValues[titleRowIndex].length; columnIndex++) {
          // console.log('For property ' + property);
          // console.log('Data values ');
          // console.log(dataValues[titleRowIndex]);
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
    loadSpreadSheetDataValues();
    var titleRowIndex = spreadsheetConfig.titleRowIndex;
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

  this.updateCellForGlober = function(globerEmail, cellUpdate) {
      loadSpreadSheetDataValues();
      var rowIndex = findRowIndexByValueInColumn(globerEmail, spreadsheetConfig.emailColumnIndex);
      
      var cell = dataRange.getCell(rowIndex + 1, cellUpdate.column);
      cell.setValue(cellUpdate.value);
  }
}

if((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = SpreadsheetRepository;
}