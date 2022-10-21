const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

const clientEmail = creds.client_email;
const privateKey = creds.private_key;

module.exports.accessSpreadsheet = async (id) => {
    const doc = new GoogleSpreadsheet(id);

    await doc.useServiceAccountAuth({
        client_email: clientEmail,
        private_key: privateKey,
    });

    await doc.loadInfo();
    return doc;
};

module.exports.getWorksheetCount = async (spreadsheet) => {
    return spreadsheet.sheetCount;
};

module.exports.accessWorksheet = async (spreadsheet, sheetIndex) => {
    return spreadsheet.sheetsByIndex[sheetIndex];
};

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

module.exports.findColumn = async (worksheet, key) => {
    await worksheet.loadHeaderRow();

    const header = worksheet.headerValues;
    let columnIndex = 0;
    for(i=0;i<header.length;i++)
    {
        if(header[i].toLowerCase().includes(key)) columnIndex = i;
    }

    const columnLetter = alphabet[columnIndex];
    await worksheet.loadCells(columnLetter+'1:'+columnLetter);
    
    const data = [worksheet, columnIndex];
    return data;
};

module.exports.extractColumnValue = async (data) => {
    const worksheet = data[0];
    const columnIndex = data[1];

    const numRows = worksheet.cellStats.loaded;
    const cellValues = [];
    let currCellValue = '';
    for(i=0;i<numRows;i++)
    {
        currCellValue = worksheet.getCell(i,columnIndex).value;
        if(currCellValue != null)
        {
            cellValues.push(currCellValue);
        }
    }

    const moreData = [worksheet, cellValues]
    return moreData;
};

module.exports.extractRowsFromColumn = async (data, key) => {
    const worksheet = data[0];
    const column = data[1];

    let rowNums = [];
    for(i=0;i<column.length;i++)
    {
        if(column[i].toLowerCase().includes(key)) rowNums.push(i);
    }

    rowNums.shift();
    rowNums.push(rowNums[rowNums.length-1]+1);
    
    const allRows = await worksheet.getRows();
    let rows = [];
    for(i=0;i<allRows.length;i++)
    {
        if(rowNums.includes(allRows[i]._rowNumber))
        {
            rows.push(allRows[i]);
        }
    }

    const moreData = [worksheet, rows];
    return moreData;
};

module.exports.extractColumnValuesFromRow = async (data, myRows) => {
    const worksheet = data[0];
    const columnIndex = data[1];
    const rows = myRows;

    const columnValues = [];
    for(i=0;i<rows.length;i++)
    {
        columnValues.push((rows[i]._rawData)[columnIndex]);
    }

    return columnValues;
};