const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const Handlebars = require('handlebars');
const cron = require('node-cron');

let rawData = fs.readFileSync('./student json files/updated-students.json');
//let rawData = fs.readFileSync('./dummy-students.json');
let myStudents = JSON.parse(rawData);

let sampleTemplate = fs.readFileSync('./emails/views/sample-exam-scores.hbs', 'utf-8');
let template = Handlebars.compile(sampleTemplate);

/*let templateHbs = fs.readFileSync('./emails/views/exam-scores.hbs', 'utf-8');
let template = Handlebars.compile(templateHbs);

let template2Hbs = fs.readFileSync('./emails/views/exam-scores-2.hbs', 'utf-8');
let template2 = Handlebars.compile(template2Hbs);*/

/*transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});*/

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAILPASSWORD,
    },
});
let scheduleEmails = cron.schedule('*/2 * * * *', sendEmails, { scheduled: true, timezone: 'America/New_York' });
scheduleEmails.start();

async function sendEmails()
{
    for(let i=0;i<myStudents.length;i++)
    {
        let emails = [];
        if(myStudents[i].student.email.trim() != '') emails.push(myStudents[i].student.email);
        if(myStudents[i].parent_1.email.trim() != '') emails.push(myStudents[i].parent_1.email);
        if(myStudents[i].parent_2.email.trim() != '') emails.push(myStudents[i].parent_2.email);
        
        mailOptions = {
            from: '"Tasnim Kweller Prep" tasnimahmed102001@gmail.com',
            to: emails,
            bcc: [],
            subject: 'Kweller Prep SHSAT Exam Scores',
            html: template(myStudents[i]),
        };

        await transporter.sendMail(mailOptions);
    }
   scheduleEmails.stop();
}