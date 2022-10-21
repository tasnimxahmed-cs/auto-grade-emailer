const fs = require('fs');
const spreadsheet = require('../spreadsheet.js');
const toJson = require('../to-json.js');

const spreadsheetId = '1PNa2cuQKcZ_d-wXoWTm_jNRTOkmYVGqEWTybxcOCWvM';
let worksheets = 0;

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let rawData = fs.readFileSync('./student json files/students.json');
let myStudents = JSON.parse(rawData);

//gets total number of sheets
spreadsheet.accessSpreadsheet(spreadsheetId)
.then((doc) => {
    return spreadsheet.getWorksheetCount(doc);
})
.then((count) => {
    worksheets = count;
    updateGrades();
});

//starts at index number of first grade sheet
async function updateGrades()
{
    for(let i=4;i<worksheets;i++)
    {
        const studentNames = await getStudentNames(i);

        const testIndices = await getNumberOfTests(i);
        
        const testScores = await returnTestScores(i, testIndices);
        
        const updatedStudents = await inputTestScores(studentNames, testScores);

        console.log(studentNames)
    }
    toJson.toJson('./student json files/updated-students.json', myStudents);
}

function getStudentNames(worksheetIndex)
{
    return new Promise((resolve, reject) => {
        let studentNames = [];
        spreadsheet.accessSpreadsheet(spreadsheetId)
        .then((doc) => {
            return spreadsheet.accessWorksheet(doc, worksheetIndex);
        })
        .then((worksheet) => {
            return spreadsheet.findColumn(worksheet, 'MY STUDENTS');
        })
        .then((data) => {
            return spreadsheet.extractColumnValue(data);
        })
        .then((data) => {
            const values = data[1];
            let spliceIndex = 0;
            for(let i=0;i<values.length;i++)
            {
                if((typeof values[i] === 'number') && (typeof values[i+1] === 'number'))
                {
                    spliceIndex = i-1;
                    break;
                } 
            }
            values.splice(0,1);
            values.splice(spliceIndex,values.length-spliceIndex);
            for(let i=0;i<values.length;i++)
            {
                console.log(values[i])
                if(i%7 == 0)
                {
                    
                    studentNames.push(values[i]);
                }
            }
            resolve(studentNames);
        });
    });
}

function getNumberOfTests(worksheetIndex)
{
    return new Promise((resolve, reject) => {
        let testIndices = [];
        spreadsheet.accessSpreadsheet(spreadsheetId)
        .then((doc) => {
            return spreadsheet.accessWorksheet(doc, worksheetIndex);
        })
        .then(async (worksheet) => {
            await worksheet.loadHeaderRow();
            const header = worksheet.headerValues;
            for(let i=0;i<header.length;i++)
            {
                if(header[i].toLowerCase().includes('test')) testIndices.push(i);
            }
            testIndices.splice(0,1);
            resolve(testIndices);
        });
    });
}

function returnTestScores(worksheetIndex, testIndices)
{
    return new Promise(async (resolve, reject) => {
        let testScores = [];
        for(let i=0;i<testIndices.length;i++)
        {
            let scoreHolder = await getTestScores(worksheetIndex, testIndices[i]);
            testScores.push(scoreHolder);
        }
        resolve(testScores);
    });
}

function getTestScores(worksheetIndex, testIndex)
{
    return new Promise((resolve, reject) => {
        spreadsheet.accessSpreadsheet(spreadsheetId)
        .then((doc) => {
            return spreadsheet.accessWorksheet(doc, worksheetIndex);
        })
        .then( async (worksheet) => {
            const columnLetter = alphabet[testIndex];
            await worksheet.loadCells(columnLetter+'1:'+columnLetter);
            return spreadsheet.extractColumnValue([worksheet, testIndex]);
        })
        .then((data) => {
            data[1].splice(0,1);
            resolve(data[1]);
        });
    });
}

function inputTestScores(studentNames, testScores)
{
    return new Promise((resolve, reject) => {
        for(let i=0;i<testScores.length;i++)
        {
            for(let j=0;j<studentNames.length;j++)
            {
                for(let k=0;k<myStudents.length;k++)
                {
                    if(myStudents[k].student.name.toLowerCase().includes(
                        studentNames[j].toLowerCase()))
                    {
                        let test = {
                            raw: {
                                reading: testScores[i][0],
                                math: testScores[i][1],
                                total: testScores[i][2],
                            },
                            scaled: {
                                reading: testScores[i][3],
                                math: testScores[i][4],
                                total: testScores[i][5],
                            }
                        };
                        myStudents[k].grades.tests.push(test);
                        testScores[i].splice(0,6);
                    }
                }
            }
        }
        resolve(myStudents);
    });
}