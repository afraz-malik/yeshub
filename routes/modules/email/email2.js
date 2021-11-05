const nodeMailer = require("nodemailer");
const config = require("config");
var fs = require("fs");
//gmail smtp setting
let transporter = nodeMailer.createTransport({
        port: config.get("SMTP.port"),
        host: config.get("SMTP.host"),
        secureConnection: config.get("SMTP.secureConnection"),
        tls: config.get("SMTP.tls"),
        auth: config.get("SMTP.auth"),
    }),
    EmailTemplate = require("email-templates").EmailTemplate,
    path = require("path"),
    Promise = require("bluebird");

function sendEmailVerification(name, email, subject, link) {
    let html = require("./html/email-yes")(name, link);
    let options = {
        from: config.get("SMTP.from"),
        to: email,
        html: html,
        subject: subject,
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.warn(err);
        } else {
            console.log(info);
        }
    });
}

function sendEmailForgot(name, email, subject, link) {
    let html = require("./html/forgot-email")(name, link);
    let mailOptions = {
        from: config.get("SMTP.from"),
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html, // plain text body
    };
    // console.log(options);

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.warn(err);
        } else {
            console.log(info);
        }
    });
}

function sendEventNotification(EventName, email, Message, user) {
    let html = require("./html/eventstart-email")(EventName, Message, user);
    let mailOptions = {
        from: config.get("SMTP.from"),
        to: email, // list of receivers
        subject: `YES!HUB Reminder: ${EventName}`, // Subject line
        html: html, // plain text body
    };
    // console.log(options);

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.warn(err);
        } else {
            console.log(info);
        }
    });
}

function sendingEmail(
    Email,
    userName,
    link,
    btnText,
    notification,
    SubjectText
) {
    console.log(
        "checking params:",
        Email,
        userName,
        link,
        btnText,
        SubjectText
    );
    return new Promise(
        function (resolve, reject) {
            try {
                let users = [
                    {
                        fullName: userName,
                        email: Email,
                        notification: notification,
                        link: link,
                        btnText: btnText,
                        SubjectText: SubjectText,
                    },
                ];

                loadTemplate("activation-email", users)
                    .then((results) => {
                        console.log("--- sending email ---");
                        console.log(results);
                        console.log("--- sending email ---");
                        return Promise.all(
                            results.map((result) => {
                                sendEmail({
                                    // to: result.context.email,
                                    to: Email,
                                    from: config.get("SMTP.from"),
                                    // subject: result.email.subject,
                                    subject: SubjectText,
                                    html: result.email.html,
                                    text: btnText,
                                });
                            })
                        );
                    })
                    .then((info) => {
                        console.log(info);
                        console.log("Yay!emails send");
                        //transporter.close();
                        resolve(true);
                    })
                    .catch((err) => {
                        console.log("err");
                        console.log(err);
                        reject(err.message);
                    });
            } catch (ex) {
                console.log("error 1");
                console.log(ex);
            }
        },
        function (err) {
            console.log("error 2");
            console.log(err);
            console.log("error 2");
            reject(err.message);
        }
    );
}

function sendingEmailSimple(Email, text) {
    let mailOptions = {
        from: config.get("SMTP.from"),
        to: Email, // list of receivers
        subject: "Activate Account", // Subject line
        text: text, // plain text body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        } else {
            console.log("email send successfully");
        }
    });
    return true;
}

function sendingEmailHtmlTemplate(user) {
    return new Promise(
        function (resolve, reject) {
            try {
                let users = user;
                loadTemplate("send-notification-email", users)
                    .then((results) => {
                        return Promise.all(
                            results.map((result) => {
                                sendEmail({
                                    to: result.context.email,
                                    // from: 'noreplay@moquire.maqware.com',
                                    from: "malvern@moquire.com",
                                    subject: result.email.subject,
                                    html: result.email.html,
                                    text: result.email.text,
                                });
                            })
                        );
                    })
                    .then(() => {
                        console.log("Yay!");
                        resolve(true);
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
            } catch (ex) {
                console.log(ex);
            }
        },
        function (err) {
            reject(err.message);
        }
    );
}

//generic methods
function sendEmail(obj) {
    return transporter.sendMail(obj);
}
function loadTemplate(templateName, contexts) {
    let template = new EmailTemplate(
        path.join(__dirname, "templates", templateName)
    );
    return Promise.all(
        contexts.map((context) => {
            return new Promise((resolve, reject) => {
                template.render(context, (err, result) => {
                    if (err) reject(err);
                    else
                        resolve({
                            email: result,
                            context,
                        });
                });
            });
        })
    );
}

exports.sendingEmail = sendingEmail;
exports.sendingEmailSimple = sendingEmailSimple;
exports.sendingEmailHtmlTemplate = sendingEmailHtmlTemplate;
exports.sendEmailVerification = sendEmailVerification;
exports.sendEmailForgot = sendEmailForgot;
exports.sendEmailEvent = sendEventNotification;

// sendEmailForgot('Shah G', 'skhaid0322@gmail.com', 'Forgot password', 'https://uat.hub.yesdigita.org');
