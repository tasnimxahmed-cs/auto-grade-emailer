const spreadsheet = require('../spreadsheet.js');
const toJson = require('../to-json.js');

const spreadsheetId = '1PNa2cuQKcZ_d-wXoWTm_jNRTOkmYVGqEWTybxcOCWvM';
const worksheetIndex = 3;

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

//accesses spreadsheet via id -> finds column named 'tutor name' -> extracts row numbers where 'tutor name' is 'tasnim' 
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

//access spreadsheet via id -> find column named 'student name' -> extracts student names from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'student email' -> extracts student emails from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'student cell' -> extracts student cells from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'parent 1 name' -> extracts parent 1 names from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'parent 1 email' -> extracts parent 1 emails from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'parent 1 phone number ' -> extracts parent 1 phone numbers from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'parent 2 name' -> extracts parent 2 names from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'parent 2 email' -> extracts parent 2 emails from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'parent 2 number' -> extracts parent 2 numbers from previously extracted row numbers
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

//access spreadsheet via id -> find column named 'course currently enrolled in' -> extracts course currently enrolled in from previously extracted row numbers
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

//creates new student objects containing all extracted information from previous functions -> pushes to new array of student objects
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

    //splits students into courses based on day
    for(i=0;i<myStudents.length;i++)
    {
        if(myStudents[i].student.course.toLowerCase().includes('sunday')) myStudents[i].student.course = 'sunday';
        else myStudents[i].student.course = 'saturday';
    }

    //render data to json file
    toJson.toJson('student json files/students.json', myStudents);
}