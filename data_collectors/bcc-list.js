const fs = require('fs');
const toJson = require('../to-json.js');

let rawData = fs.readFileSync('./student json files/updated-students.json');
let myStudents = JSON.parse(rawData);

let saturdayBccList = '';
let sundayBccList = '';

for(i=0;i<myStudents.length;i++)
{
    if(myStudents[i].student.course === 'saturday')
    {
        if(myStudents[i].student.email.trim() != '') saturdayBccList += myStudents[i].student.email.trim()+';';
        if(myStudents[i].parent_1.email.trim() != '') saturdayBccList += myStudents[i].parent_1.email.trim()+';';
        if(myStudents[i].parent_2.email.trim() != '') saturdayBccList += myStudents[i].parent_2.email.trim()+';';
    }
    else
    {
        if(myStudents[i].student.email.trim() != '') sundayBccList += myStudents[i].student.email.trim()+';';
        if(myStudents[i].parent_1.email.trim() != '') sundayBccList += myStudents[i].parent_1.email.trim()+';';
        if(myStudents[i].parent_2.email.trim() != '') sundayBccList += myStudents[i].parent_2.email.trim()+';';
    }
}

let bccLists = {
    saturday: saturdayBccList,
    sunday: sundayBccList,
};

toJson.toJson('./student json files/bcc-list.json', bccLists);