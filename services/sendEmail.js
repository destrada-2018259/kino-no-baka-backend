const { response, request } = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs')
const handlebars = require('handlebars')

const sendEmailTo = async (req = request, res = response) => {
    const { to, name} = req.body;

    const emailSent = await emailService(to, name);

    const respuesta = emailSent.response;
    res.json({
        msg: 'Service email',
        respuesta
    });
};
const sendEmailToKino = async (req = request, res = response) => {
    const { email, name, message} = req.body;

    const emailSent = await emailService2(email, name, message);

    const respuesta = emailSent.response;
    res.json({
        msg: 'Service email',
        respuesta
    });
};

const emailService = async (to, name) => {
    //Gmail credentials for nodemailer
    const userGmail = "danielgowrojo@gmail.com";
    const passAppGmail = "gvfq hyjr chqc bnbf";
    //HTML Template
    const templateSource = fs.readFileSync('./templates/confirmation.html', 'utf-8')

    //Transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: userGmail,
            pass: passAppGmail
        }
    });
    //MailOptions
    const mailOptions = {
        from: userGmail,
        to: to,
        //subject: "Kino has received your message!",
        subject:`${name}, Kino has received your message!`,
        html: templateSource
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.log("Error sending email: ", error);
        throw error;
    }
};

const emailService2 = async (email, name, message) => {
    //Gmail credentials for nodemailer
    const userGmail = "danielgowrojo@gmail.com";
    const passAppGmail = "gvfq hyjr chqc bnbf";
    //HTML Template
    let templateSource = fs.readFileSync('./templates/notification.html', 'utf-8')
    templateSource = templateSource
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{message}}', message);
    //Transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: userGmail,
            pass: passAppGmail
        }
    });
    //MailOptions
    const mailOptions = {
        from: userGmail,
        to: "danielgowrojo@gmail.com",
        subject:`${name} has sent you a message`,
        html: templateSource
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return info;
    } catch (error) {
        console.log("Error sending email: ", error);
        throw error;
    }
};
module.exports = {
    sendEmailTo,
    sendEmailToKino
};