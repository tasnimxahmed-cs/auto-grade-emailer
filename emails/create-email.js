const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const Handlebars = require('handlebars');
const cron = require('node-cron');

let rawData = fs.readFileSync('./student json files/updated-students.json');
//let rawData = fs.readFileSync('./dummy-students.json');
let myStudents = JSON.parse(rawData);

let templateHbs = fs.readFileSync('./emails/views/exam-scores.hbs', 'utf-8');
let template = Handlebars.compile(templateHbs);

transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

let scheduleEmails = cron.schedule('0 0 8 * * *', sendEmails, { scheduled: true, timezone: 'America/New_York' });
scheduleEmails.start();

async function sendEmails()
{
    for(let i=0;i<myStudents.length;i++)
    {
        if(myStudents[i].student.course === 'cram')
        {
            let emails = [];
            if(myStudents[i].student.email.trim() != '') emails.push(myStudents[i].student.email);
            if(myStudents[i].parent_1.email.trim() != '') emails.push(myStudents[i].parent_1.email);
            if(myStudents[i].parent_2.email.trim() != '') emails.push(myStudents[i].parent_2.email);

            let mailOptions = {
                from: '"Tasnim Kweller Prep" tasnimbrooklyntech@kwellerprep.com',
                to: emails,
                subject: 'Kweller Prep SHSAT Cram Exam Scores',
                html: template(myStudents[i]),
            };

            await transporter.sendMail(mailOptions);
        }
        else
        {
            let emails = [];
            if(myStudents[i].student.email.trim() != '') emails.push(myStudents[i].student.email);
            if(myStudents[i].parent_1.email.trim() != '') emails.push(myStudents[i].parent_1.email);
            if(myStudents[i].parent_2.email.trim() != '') emails.push(myStudents[i].parent_2.email);

            let mailOptions = {
                from: '"Tasnim Kweller Prep" tasnimbrooklyntech@kwellerprep.com',
                to: emails,
                subject: 'Kweller Prep Spring SHSAT Exam Scores',
                html: template(myStudents[i]),
            };

            await transporter.sendMail(mailOptions);
        }
    }
    scheduleEmails.stop();
}