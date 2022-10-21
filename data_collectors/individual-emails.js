const fs = require('fs');
const toJson = require('../to-json.js');

let rawData = fs.readFileSync('./student json files/updated-students.json');
let myStudents = JSON.parse(rawData);

let individualEmails = {
    saturday: [],
    sunday: [],
};

for(i=0;i<myStudents.length;i++)
{
    let student = {
        name: myStudents[i].student.name,
        emails: '',
    };

    if(myStudents[i].student.email.trim() != '') student.emails += myStudents[i].student.email.trim()+';';
    if(myStudents[i].parent_1.email.trim() != '') student.emails += myStudents[i].parent_1.email.trim()+';';
    if(myStudents[i].parent_2.email.trim() != '') student.emails += myStudents[i].parent_2.email.trim()+';';

    if(myStudents[i].student.course === 'saturday')
    {
        individualEmails.saturday.push(student);
    }
    else
    {
        individualEmails.sunday.push(student);
    }
}

toJson.toJson('./student json files/individual-emails.json', individualEmails);