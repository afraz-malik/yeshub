const nodeMailer = require('nodemailer');
const config = require('config');
var fs = require('fs');
//gmail smtp setting
let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dev.zainali@gmail.com',
        pass: 'Alimolahaq512'
    },
}),
    EmailTemplate = require('email-templates').EmailTemplate,
    path = require('path'),
    Promise = require('bluebird');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
//var data = require('../email/html/activationAccount.html', { title: "Title hererrere", }); // path to your HTML template
var data2 = require('../email/html/activationAccount.html', { title: "Title hererrere", });
function sendingEmail(Email, hash) {


    // let linkGenerate = "http://localhost:3000/activate/" + hash + "/" + Email + "";
    // let linkGenerate = "http://rehold.maqware.com/verify-email/" + hash + "/" + Email + "";

    //gmail smtp setting
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maqware21@gmail.com',
            pass: 'maqware.1234'
        }
    });
    let mailOptions = {
        from: "mo@moquire.com", // sender address
        to: Email, // list of receivers
        subject: "Activate Account", // Subject line
        //text: req.body.body, // plain text body
        html: data2,
        // html: '<b>Please click on the link to activate your account</b><a href="' + linkGenerate + '">Activate Account</a>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log('email send successfully');
        }

    });
    return true;

}

function sendingEmailSimple(Email, text) {


    // let linkGenerate = "http://localhost:3000/activate/" + hash + "/" + Email + "";
    // let linkGenerate = "http://rehold.maqware.com/verify-email/" + hash + "/" + Email + "";

    //gmail smtp setting
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maqware21@gmail.com',
            pass: 'maqware.1234'
        }
    });
    let mailOptions = {
        from: "mo@moquire.com", // sender address
        to: Email, // list of receivers
        subject: "Activate Account", // Subject line
        text: text, // plain text body
        //html: data2,
        //html: '<b>' + text + '' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log('email send successfully');
        }

    });
    return true;

}

function sendingEmailHtmlTemplate(Email, firstName, lastName, notification) {

    let users = [
        {
            firstName: firstName,
            lastName: lastName,
            fullName: firstName + " " + lastName,
            email: Email,
            notification: notification
        },
    ]
    console.log(users);

    function sendEmail(obj) {
        return transporter.sendMail(obj);
    }

    function loadTemplate(templateName, contexts) {
        let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
        return Promise.all(contexts.map((context) => {
            return new Promise((resolve, reject) => {
                template.render(context, (err, result) => {
                    if (err) reject(err);
                    else resolve({
                        email: result,
                        context,
                    });
                });
            });
        }));
    }

    loadTemplate('send-notification-email', users).then((results) => {
        return Promise.all(results.map((result) => {
            sendEmail({
                to: result.context.email,
                from: 'Me :)',
                subject: result.email.subject,
                html: result.email.html,
                text: result.email.text,
            });
        }));
    }).then(() => {
        console.log('Yay!');
    });

    return true;

}



function checkUser(id) {
    return new Promise(function (resolve, reject) {
        User.findOne({ where: { id: id }, attributes: ['firstName', 'lastName'] })
            .then(function (User) {
                const fullname = User.firstName + '' + User.lastName;
                var response = { username: fullname, user: User }
                resolve(response);
            });
    });

}


exports.sendingEmail = sendingEmail;
exports.sendingEmailSimple = sendingEmailSimple;
exports.sendingEmailHtmlTemplate = sendingEmailHtmlTemplate;
