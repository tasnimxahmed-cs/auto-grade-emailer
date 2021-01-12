const spreadsheet = require('../spreadsheet.js');
const toJson = require('../to-json.js');

const spreadsheetId = '1PNa2cuQKcZ_d-wXoWTm_jNRTOkmYVGqEWTybxcOCWvM';
const worksheetIndex = 0;

let myRows = [];

let studentNames = [];
let studentEmails = [];
let studentCells = [];
let parent1Names = [];
let parent1Emails = [];
let parent1Cells = [];
let parent2Names = [];
let parent2Emails = [];
let parent2Cells = [];
let courses = [];

let myStudents = [];

spreadsheet.accessSpreadsheet(spreadsheetId)
.then((doc) => {
    return spreadsheet.accessWorksheet(doc, worksheetIndex);
})
.then((worksheet) => {
    return spreadsheet.findColumn(worksheet, 'tutor name');
})
.then((data) => {
    return spreadsheet.extractColumnValue(data);
})
.then((data) => {
    return spreadsheet.extractRowsFromColumn(data, 'tasnim');
})
.then((data) => {
    myRows = data[1];
    studentName();
});

function studentName()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'student name');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((names) => {
        studentNames = names;
        studentEmail();
    });
}

function studentEmail()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'student email');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((emails) => {
        studentEmails = emails;
        studentCell();
    });
}

function studentCell()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'student cell');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((cells) => {
        studentCells = cells;
        parent1Name();
    });
}

function parent1Name()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'parent 1 name');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((names) => {
        parent1Names = names;
        parent1Email();
    });
}

function parent1Email()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'parent 1 email');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((emails) => {
        parent1Emails = emails;
        parent1Cell();
    });
}

function parent1Cell()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'parent 1 phone number');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((cells) => {
        parent1Cells = cells;
        parent2Name();
    });
}

function parent2Name()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'parent 2 name');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((names) => {
        parent2Names = names;
        parent2Email();
    });
}

function parent2Email()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'parent 2 email');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((emails) => {
        parent2Emails = emails;
        parent2Cell();
    });
}

function parent2Cell()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'parent 2 number');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((cells) => {
        parent2Cells = cells;
        course();
    });
}

function course()
{
    spreadsheet.accessSpreadsheet(spreadsheetId)
    .then((doc) => {
        return spreadsheet.accessWorksheet(doc, worksheetIndex);
    })
    .then((worksheet) => {
        return spreadsheet.findColumn(worksheet, 'course currently enrolled in');
    })
    .then((data) => {
        return spreadsheet.extractColumnValuesFromRow(data, myRows);
    })
    .then((course) => {
        courses = course;
        generateStudents();
    });
}

function generateStudents()
{
    for(i=0;i<studentNames.length;i++)
    {
        let tempStudent = {
            student: {
                name: '',
                email: '',
                cell: '',
                course: '',
            },
            parent_1: {
                name: '',
                email: '',
                cell: '',
            },
            parent_2: {
                name: '',
                email: '',
                cell: '',
            },
            grades: {
                tests: [],
                quizzes: [],
            }
        };

        tempStudent.student.name = studentNames[i];
        tempStudent.student.email = studentEmails[i];
        tempStudent.student.cell = studentCells[i];
        tempStudent.student.course = courses[i];
        tempStudent.parent_1.name = parent1Names[i];
        tempStudent.parent_1.email = parent1Emails[i];
        tempStudent.parent_1.cell = parent1Cells[i];
        tempStudent.parent_2.name = parent2Names[i];
        tempStudent.parent_2.email = parent2Emails[i];
        tempStudent.parent_2.cell = parent2Cells[i];
        myStudents.push(tempStudent);
    }

    for(i=0;i<myStudents.length;i++)
    {
        if(myStudents[i].student.course.toLowerCase().includes('cram')) myStudents[i].student.course = 'cram';
        else myStudents[i].student.course = 'shsat';
    }

    toJson.toJson('./student json files/students.json', myStudents);
}