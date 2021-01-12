const fs = require('fs');
const toJson = require('../to-json.js');

let rawData = fs.readFileSync('./student json files/updated-students.json');
let myStudents = JSON.parse(rawData);

let cramBccList = '';
let shsatBccList = '';

for(i=0;i<myStudents.length;i++)
{
    if(myStudents[i].student.course === 'cram')
    {
        if(myStudents[i].student.email.trim() != '') cramBccList += myStudents[i].student.email.trim()+';';
        if(myStudents[i].parent_1.email.trim() != '') cramBccList += myStudents[i].parent_1.email.trim()+';';
        if(myStudents[i].parent_2.email.trim() != '') cramBccList += myStudents[i].parent_2.email.trim()+';';
    }
    else
    {
        if(myStudents[i].student.email.trim() != '') shsatBccList += myStudents[i].student.email.trim()+';';
        if(myStudents[i].parent_1.email.trim() != '') shsatBccList += myStudents[i].parent_1.email.trim()+';';
        if(myStudents[i].parent_2.email.trim() != '') shsatBccList += myStudents[i].parent_2.email.trim()+';';
    }
}

let bccLists = {
    cram: cramBccList,
    shsat: shsatBccList,
};

toJson.toJson('./student json files/bcc-list.json', bccLists);